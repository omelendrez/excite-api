const sql = require("./db.js")
const { findNumber, updateNumber } = require("../helpers")

const NUMCOD = 7

const Ajustest = function (record) {
  this.AJUNUM = record.AJUNUM
  this.AJUFEC = record.AJUFEC
  this.PRODCOD = record.PRODCOD
  this.AJUCAN = record.AJUCAN
}

Ajustest.create = (newRecord, result) => {
  findNumber(NUMCOD, (err, data) => {
    const value = data.NUMVAL + 1
    newRecord.AJUNUM = value
    sql.query("INSERT INTO ajustest SET ?", newRecord, (err, res) => {
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

Ajustest.findById = (id, result) => {
  const sqlQuery = `SELECT * FROM ajustest WHERE a.ID = ${id}`
  sql.query(sqlQuery, (err, res) => {
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

Ajustest.getAll = result => {
  const sqlQuery = `SELECT a.ID, a.AJUNUM, DATE_FORMAT(a.AJUFEC, '%Y-%m-%d') AJUFEC, a.PRODCOD, p.PRODDES, a.AJUCAN FROM ajustest AS a INNER JOIN producto AS p ON p.PRODCOD = a.PRODCOD;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("ajustest: ", res)
    result(null, res)
  })
}

Ajustest.updateById = (id, record, result) => {
  const sqlQuery = "UPDATE ajustest SET AJUNUM = ?, AJUFEC = ?, PRODCOD = ?, AJUCAN = ? WHERE ID = ?"

  sql.query(sqlQuery, [record.AJUNUM, record.AJUFEC, record.PRODCOD, record.AJUCAN, id], (err, res) => {
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

Ajustest.remove = (id, result) => {
  const sqlQuery = "DELETE FROM ajustest WHERE ID = ?"

  sql.query(sqlQuery, id, (err, res) => {
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

Ajustest.removeAll = result => {
  sql.query("DELETE FROM ajustest", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} ajustest`)
    result(null, res)
  })
}

module.exports = Ajustest