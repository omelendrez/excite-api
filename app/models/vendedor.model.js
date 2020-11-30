const sql = require("./db.js")
const { findNumber, updateNumber } = require("../helpers")

const NUMCOD = 2

const Vendedor = function (record) {
  const keys = Object.keys(record)
  keys.map(key => this[key] = record[key])
}

Vendedor.create = (newRecord, result) => {
  findNumber(NUMCOD, (err, data) => {
    const value = data.NUMVAL + 1
    newRecord.VENCOD = value
    sql.query("INSERT INTO vendedor SET ?", newRecord, (err, res) => {
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

Vendedor.findById = (id, result) => {
  sql.query(`SELECT * FROM vendedor WHERE id = ${id}`, (err, res) => {
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

Vendedor.getAll = result => {
  const sqlQuery = `SELECT ID, VENCOD, VENNOM, VENDOM, VENLOC, VENTEL, VENCEL, VENOBS, VENCP FROM vendedor;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Vendedor.updateById = (id, record, result) => {
  const fields = []
  const values = []
  Object.keys(record).filter(field => field != 'ID').map(field => {
    fields.push(`${field} = ?`)
    values.push(record[field])
  })
  values.push(id)
  sql.query(`UPDATE vendedor SET ${fields.join(',')}  WHERE ID = ?`,
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

Vendedor.remove = (id, result) => {
  sql.query("DELETE FROM vendedor WHERE id = ?", id, (err, res) => {
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

Vendedor.removeAll = result => {
  sql.query("DELETE FROM vendedor", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Vendedor