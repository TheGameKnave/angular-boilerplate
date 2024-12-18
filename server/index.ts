import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import pino from 'express-pino-logger';
import config from './config/environment';
import rateLimit from 'express-rate-limit';
import apiRouter from './routes/api';
import { readFeatureFlags, writeFeatureFlags } from './services/featureFlagService';

declare global {
  var cache: {
    [resource: string]: {
      time: Date;
      data: any;
    };
  };
}
global.cache = {};

function setupStaticFileServing(app: express.Application, env: string) {
  if (env === 'production' || env === 'staging' || env === 'development') {
    const dirname = path.resolve(__dirname, '../client/dist/angular-boilerplate/browser');
    app.use(express.static(dirname, { maxAge: 3600000 }));

    app.get('*', (req, res) => {
      res.sendFile(path.join(dirname, 'index.html'));
    });
  }
}

export function setupApp(): express.Application {
  const app = express();
  const logger = pino();

  app.use(logger);
  app.use(express.json());

  const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 2000,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api', apiLimiter);
  app.use('/api', apiRouter);

  setupStaticFileServing(app, process.env.NODE_ENV || 'development');

  return app;
}

// Initialize server and WebSocket
if (require.main === module) {
  const app = setupApp();
  const server = createServer(app);
  const io = new SocketIOServer(server);

  app.set('io', io);

  // Handle WebSocket connections
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Send the current flags when a client connects
    socket.emit('feature-flags', readFeatureFlags());

    // Handle updates to the feature flags
    socket.on('update-feature-flags', (newFeatures: Record<string, boolean>) => {
      console.log(`Received updated flags from ${socket.id}:`, newFeatures);

      // Write updates to the file
      writeFeatureFlags(newFeatures);

      // Broadcast the updated flags to all clients
      io.emit('feature-flags', newFeatures);
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected:', socket.id);
    });
  });

  const PORT = config.server_port || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
