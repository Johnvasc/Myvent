const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

const ssl = {
  require: true,
  rejectUnauthorized: false
};

// Railway (e outros provedores) expõem a conexão via DATABASE_URL.
// Em dev local sem essa variável, cai para as DB_* individuais do .env.
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: { ssl }
    })
  : new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialectOptions: { ssl }
    });

module.exports = sequelize;