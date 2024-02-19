const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

module.exports = {
  server_port    : process.env.PORT,
  server_id      : process.env.SERVER_ID,
  data_key       : process.env.DATA_KEY,
};