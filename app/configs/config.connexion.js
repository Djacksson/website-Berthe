const mysql = require('mysql');
require('dotenv').config()

// MySQL Connection Configuration
const connection = mysql.createConnection({
    host: process.env.MYSQL_ROOT_HOST,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

module.exports = { connection };