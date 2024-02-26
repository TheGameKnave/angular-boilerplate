import * as dotenv from 'dotenv';
dotenv.config({path: '../.env'});

interface Config {
  server_port: string | undefined;
  server_id: string | undefined;
  data_key: string | undefined;
}

const config: Config = {
  server_port: process.env.PORT,
  server_id: process.env.SERVER_ID,
  data_key: process.env.DATA_KEY,
};

export default config;