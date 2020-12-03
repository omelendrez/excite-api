const sql = require("./db.js")
const { findNumber, updateNumber } = require("../helpers")

const NUMCOD = 0

const Cliente = function (record) {
  const keys = Object.keys(record)
  keys.map(key => this[key] = record[key])
}

Cliente.create = (newRecord, result) => {
  findNumber(NUMCOD, (err, data) => {
    const value = data.NUMVAL + 1
    newRecord.CLICOD = value
    sql.query("INSERT INTO clientes SET ?", newRecord, (err, res) => {
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

Cliente.findById = (id, result) => {
  sql.query(`SELECT * FROM clientes WHERE id = ${id}`, (err, res) => {
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

Cliente.getAll = (query, result) => {
  const { search } = query
  const sqlQuery = `SELECT c.ID, CLICOD, CLINOM, CLIDOM, CLILOC, CLICUIT, CLITEL, CLICEL, CLICP, CLIFP, CLIINT, i.IVADES FROM clientes c INNER JOIN iva i ON c.IVACOD = i.IVACOD ${search ? 'WHERE CONCAT(CLINOM," ",CLILOC," ",CLIDOM," ",CLITEL," ",CLICEL) LIKE "%' + search + '%"' : ''};`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Cliente.updateById = (id, record, result) => {
  if (record.CLISALFEC) {
    record.CLISALFEC = record.CLISALFEC.split('T')[0]
  }
  const fields = []
  const values = []
  Object.keys(record).filter(field => field != 'ID').map(field => {
    fields.push(`${field} = ?`)
    values.push(record[field])
  })
  values.push(id)
  sql.query(`UPDATE clientes SET ${fields.join(',')}  WHERE ID = ?`,
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

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
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

Cliente.removeAll = result => {
  sql.query("DELETE FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Cliente