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
  app.get('/test-ws', (req, res) => {
    if (req.headers.upgrade !== 'websocket') {
      console.log('Not a WebSocket request');
      res.status(400).send('Not a WebSocket request');
    } else {
      console.log('WebSocket request received');
      res.status(200).send('WebSocket request accepted');
    }
  });
  app.use(logger);
  app.use(express.json());

  const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 2000,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use((req, res, next) => {
    console.log(`[HTTP] ${req.method} ${req.url}`);
    next();
  });
  app.use('/api', apiLimiter);
  app.use('/api', apiRouter);

  setupStaticFileServing(app, process.env.NODE_ENV || 'development');

  return app;
}

// Initialize server and WebSocket
if (require.main === module) {
  console.log('Starting server...'); // Log server startup

  const app = setupApp();
  const server = createServer(app);
  console.log('HTTP server created'); // Confirm HTTP server is created

  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Replace with your frontend's actual origin for production
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true
    },
  });
  server.on('upgrade', (req, socket, head) => {
    console.log(`[Upgrade Request] URL: ${req.url}`);
    console.log(`Headers:`, req.headers);
  });
  console.log('Socket.IO server initialized:', io.path());
  app.set('io', io);

  io.engine.on('headers', (headers, request) => {
    console.log(`[WebSocket] Incoming request: ${request.url}`);
  });
  io.engine.on('connection', (socket) => {
    console.log('[Engine] Connection established');
  });
  
  io.engine.on('disconnect', (socket) => {
    console.log('[Engine] Connection closed');
  });
  io.use((socket, next) => {
    console.log('Handshake headers:', socket.handshake.headers);
    console.log('Handshake query:', socket.handshake.query);
    console.log('Handshake URL:', socket.handshake.url);
  
    // Proceed with connection
    next();
  });
  io.on('connect_error', (err) => {
    console.error('WebSocket connection error:', err);
  });  
  // Handle WebSocket connections
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Send the current flags when a client connects
    socket.emit('feature-flags', readFeatureFlags());
    socket.onAny((event, ...args) => {
      console.log(`Event received: ${event}, Data:`, args);
    });
    // Handle updates to the feature flags
    socket.on('update-feature-flag', (newFeatures: Record<string, boolean>) => {
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

  const PORT = config.server_port;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
