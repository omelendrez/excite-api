const mysql = require("mysql2");

const pool = mysql.createPool({
  // connetionLimit: 10,
  host: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  multipleStatements: true,
  timezone: "+00:00",
  dateStrings: ["DATE", "DATETIME"],
});

module.exports = pool;
