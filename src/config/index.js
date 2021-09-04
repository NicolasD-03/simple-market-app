require("dotenv").config({ path: "/local.env" });

const hostname = process.env.HOST;
const port = process.env.SERVER_PORT;
const apiAdress = process.env.API_ADRESS;
const apiKey = process.env.API_KEY;
const jwtKey = process.env.JWT_KEY;

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
  hostname,
  port,
  apiAdress,
  apiKey,
  jwtKey,
  dbHost,
  dbPort,
  dbName,
};
