const { Sequelize } = require('sequelize');
const config = require('./config');
const mysql = require('mysql2/promise');

const { database, username, password, host } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  logging: false
});

// to connect Database
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

// to create database
async function createDatabaseIfNotExists() {
  try {
    // Connect to MySQL without specifying database
    const connection = await mysql.createConnection({
      host,
      user: username,
      password
    });

    // Create the DB if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`✅ Database "${database}" is ready.`);
    await connection.end();
  } catch (error) {
    console.error('❌ Error creating database:', error);
    throw error;
  }
}

module.exports = { sequelize, connectDB,createDatabaseIfNotExists };
