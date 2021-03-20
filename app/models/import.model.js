const pool = require('./db/pool')

exports.importData = sqlQuery => {
  pool.executeQuery(sqlQuery, null, (err, res) => {
    if (err) throw err
  })
}

