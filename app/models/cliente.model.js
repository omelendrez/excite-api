const sql = require("./db.js")
const { findNumber, updateNumber } = require("../helpers")

const NUMCOD = 0

const Cliente = function (record) {
  this.CLICOD = record.CLICOD
  this.CLINOM = record.CLINOM
  this.CLIDOM = record.CLIDOM
  this.CLILOC = record.CLIDOM
  this.CLICUIT = record.CLICUIT
  this.CLITEL = record.CLITEL
  this.CLICEL = record.CLICEL
  this.CLICP = record.CLICP
  this.CLIFP = record.CLIFP
  this.CLIINT = record.CLIINT
  this.IVACOD = record.IVACOD
  this.CLIFAN = record.CLIFAN
  this.TRACOD = record.TRACOD
  this.PROCOD = record.PROCOD
  this.CLISALFEC = record.CLISALFEC
  this.CLISALDEB = record.CLISALDEB
  this.CLISALHAB = record.CLISALHAB
  this.CLISALIMP = record.CLISALIMP
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

Cliente.getAll = result => {
  const sqlQuery = 'SELECT ID, CLICOD, CLINOM, CLIDOM, CLILOC, CLICUIT, CLITEL, CLICEL, CLICP, CLIFP, CLIINT, IVACOD FROM clientes;'
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
  sqlQuery = `UPDATE clientes SET 
  CLICOD = ?, CLINOM = ?, CLIDOM = ?, CLILOC = ?, CLICUIT = ?, CLITEL = ?, CLICEL = ?, CLICP = ?, CLIFP = ?, CLIINT = ?, IVACOD = ?, CLIFAN = ?, TRACOD = ?, PROCOD = ?, CLISALFEC = ?, CLISALDEB = ?, CLISALHAB = ?, CLISALIMP = ? WHERE ID = ?;`
  sql.query(sqlQuery,
    [record.CLICOD, record.CLINOM, record.CLIDOM, record.CLILOC, record.CLICUIT, record.CLITEL, record.CLICEL, record.CLICP, record.CLIFP, record.CLIINT, record.IVACOD, record.CLIFAN, record.TRACOD, record.PROCOD, record.CLISALFEC, record.CLISALDEB, record.CLISALHAB, record.CLISALIMP, id],
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