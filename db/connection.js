const { Pool } = require('pg');
const path = require('path')
//set node environment variable
const ENV = process.env.NODE_ENV || 'development';

//configure environment from env file
require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

//throw error if neither test/dev PGDATABASE or prod DATABASE_URL are set
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

//set config variable 
const config =
  ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

module.exports = new Pool(config);
