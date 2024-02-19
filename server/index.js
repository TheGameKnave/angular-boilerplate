const path = require("path");
const express = require('express');
const pino = require('express-pino-logger')();
const { server_port } = require('./config/environment');
const rateLimit = require('express-rate-limit');

const app = express();
const morgan = require("morgan");

global.cache = {};

app.use(morgan("tiny")); // logging framework

app.use(express.json());
app.use(pino);

const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minute window
	max: 2000, // Limit each IP to 2000 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use((function(req, res, next) {
  console.log('Time:', Date.now());
  next();
}));
app.use('/api', apiLimiter);
app.use('/api', require('./routes/api'));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'development') {
  // Serve any static files
  let dirname = __dirname.replace("/server", "")
  app.use(express.static(path.join(dirname, 'client/dist/angular-boilerplate'),{maxAge:3600000}));

  // Handle app routing, return all requests to ngx app
  app.get('*', function(req, res) {
    res.sendFile(path.join(dirname, 'client/dist/angular-boilerplate', 'index.html'));
  });
}

app.listen(server_port || 3000, () => {
  console.log('Express server is running on ' + server_port || 3000)
});
