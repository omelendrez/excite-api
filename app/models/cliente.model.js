const sql = require("./db.js")
const { findNumber, updateNumber } = require("../helpers")

const NUMCOD = 0

const Cliente = function (record) {
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
  this.LOCCOD = record.LOCCOD
  this.CLITIPO = record.CLITIPO
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
      console.log("created record: ", { id: res.insertId, ...newRecord })
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
      console.log("found record: ", res[0])
      result(null, res[0])
      return
    }

    result({ kind: "not_found" }, null)
  })
}

Cliente.getAll = result => {
  sql.query("SELECT * FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("clientes: ", res)
    result(null, res)
  })
}

Cliente.updateById = (id, record, result) => {
  sqlQuery = `UPDATE clientes SET 
  CLICOD = ?, CLINOM = ?, CLIDOM = ?, CLILOC = ?, CLICUIT = ?, CLITEL = ?, CLICEL = ?, CLICP = ?, CLIFP = ?, CLIINT = ?, IVACOD = ?, CLIFAN = ?, TRACOD = ?, PROCOD = ?, CLISALFEC = ?, CLISALDEB = ?, CLISALHAB = ?, CLISALIMP = ?, LOCCOD = ?, CLITIPO = ? 
  WHERE ID = ?;`
  sql.query(sqlQuery,
    [record.CLICOD, record.CLINOM, record.CLIDOM, record.CLILOC, record.CLICUIT, record.CLITEL, record.CLICEL, record.CLICP, record.CLIFP, record.CLIINT, record.IVACOD, record.CLIFAN, record.TRACOD, record.PROCOD, record.CLISALFEC, record.CLISALDEB, record.CLISALHAB, record.CLISALIMP, record.LOCCOD, record.CLITIPO, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated record: ", { id: id, ...record })
      result(null, { id: id, ...record })
    }
  )
}

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    console.log("deleted record with id: ", id)
    result(null, res)
  })
}

Cliente.removeAll = result => {
  sql.query("DELETE FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} clientes`)
    result(null, res)
  })
}

module.exports = Cliente