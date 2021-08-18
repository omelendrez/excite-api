const pool = require("./db");

module.exports.executeQuery = (query, values, callback) => {
  pool.getConnection(function (error, connection) {
    if (error) return callback(error);
    const newQuery = `SET time_zone='+00:00';${query}`;
    connection.query(newQuery, values, (error, results, fields) => {
      connection.release();
      if (error) return callback(error);
      callback(false, results, fields);
    });
  });
};
