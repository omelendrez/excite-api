const pool = require("./db");

module.exports.executeQuery = (query, values, callback) => {
  pool.getConnection(function (error, connection) {
    if (error) return callback(error);
    connection.query(query, values, (error, results, fields) => {
      connection.release();
      if (error) return callback(error);
      callback(false, results, fields);
    });
  });
};
