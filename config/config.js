// const { cloudinary_js_config } = require('./cloudinary');

require('dotenv').config();

module.exports = {
    development: {
    PORT: process.env.PORT || 3000,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    sendGridApiKey:process.env.SENDGRID_API_KEY,
    sendGridUsername: process.env.SENDGRID_USERNAME || 'apikey',
email: process.env.SENDER_EMAIL || 'your_verified_sender@example.com',
 cloudinaryCloudName:process.env.CLOUDINARY_CLOUD_NAME,
 cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
 cloudinaryApiSecret:process.env.CLOUDINARY_API_SECRET,
  },
  production: {
    // similar config for production
  }
};