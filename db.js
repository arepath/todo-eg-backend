const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection.promise();