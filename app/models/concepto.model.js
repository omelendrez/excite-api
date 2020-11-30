const sql = require("./db.js")

const NUMCOD = 10

const Concepto = function (record) {
  const keys = Object.keys(record)
  keys.map(key => this[key] = record[key])
}

Concepto.create = (newCustomer, result) => {
  sql.query("INSERT INTO concepto SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newCustomer })
  })
}

Concepto.findById = (id, result) => {
  sql.query(`SELECT * FROM concepto WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res[0])
      return
    }

    result({ kind: "not_found" }, null)
  })
}

Concepto.getAll = result => {
  const sqlQuery = `SELECT c.ID, c.CONNUM, c.CONFEC, c.CONDES, c.CONCLI, cl.CLINOM, c.CONCANDEB, c.CONCANHAB FROM concepto c INNER JOIN clientes cl ON c.CONCLI = cl.CLICOD ORDER BY c.CONNUM DESC;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Concepto.updateById = (id, record, result) => {
  record.CONFEC = record.CONFEC.split('T')[0]
  const fields = []
  const values = []
  Object.keys(record).filter(field => field != 'ID').map(field => {
    fields.push(`${field} = ?`)
    values.push(record[field])
  })
  values.push(id)
  sql.query(`UPDATE concepto SET ${fields.join(',')}  WHERE ID = ?`,
    values,
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null)
        return
      }

      result(null, { id: id, ...record })
    }
  )
}

Concepto.remove = (id, result) => {
  sql.query("DELETE FROM concepto WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    result(null, res)
  })
}

Concepto.removeAll = result => {
  sql.query("DELETE FROM concepto", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Concepto