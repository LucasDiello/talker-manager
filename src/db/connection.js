const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

module.exports = connection;