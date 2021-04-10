const pool = require("./db/pool");

exports.importData = (sqlQuery) => {
  pool.executeQuery(sqlQuery, null, (err, res) => {
    if (err) throw err;
  });
};

/* UPDATE clientes c
INNER JOIN vendedo1 v ON v.CLICOD = c.CLICOD
SET c.VENCOD = v.VENCOD
 */
