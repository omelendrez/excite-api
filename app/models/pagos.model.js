const sql = require("./db.js")
const { findNumber, updateNumber } = require("../helpers")

const NUMCOD = 5

const Pagos = function (record) {
  const keys = Object.keys(record)
  keys.map(key => this[key] = record[key])
}

Pagos.create = (newRecord, result) => {
  findNumber(NUMCOD, (err, data) => {
    const value = data.NUMVAL + 1
    newRecord.PAGNUM = value
    sql.query("INSERT INTO pagos SET ?", newRecord, (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }
      updateNumber(NUMCOD, value)
      result(null, { id: res.insertId, ...newRecord })
    })
  })
}

Pagos.findById = (id, result) => {
  sql.query(`SELECT * FROM pagos WHERE id = ${id}`, (err, res) => {
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

Pagos.getAll = result => {
  const sqlQuery = `SELECT p.ID, p.PAGNUM, p.PAGFEC, c.CLICOD, c.CLINOM, (SELECT  IFNULL(SUM(PAGIMP), 0) FROM pagos2 WHERE PAGNUM <> 0 AND PAGNUM = p.PAGNUM) TOTAL FROM pagos p INNER JOIN clientes c ON p.CLICOD = c.CLICOD WHERE p.PAGNUM <> 0 ORDER BY p.ID DESC;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Pagos.updateById = (id, record, result) => {
  const fields = []
  const values = []
  Object.keys(record).filter(field => field != 'ID').map(field => {
    fields.push(`${field} = ?`)
    values.push(record[field])
  })
  values.push(id)
  sql.query(`UPDATE pagos SET ${fields.join(',')}  WHERE ID = ?`,
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

Pagos.remove = (id, result) => {
  sql.query("DELETE FROM pagos WHERE id = ?", id, (err, res) => {
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

Pagos.removeAll = result => {
  sql.query("DELETE FROM pagos", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Pagos