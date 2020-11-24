const sql = require("./db.js")

const Numeros = function (record) {
  this.NUMCOD = record.NUMCOD
  this.NUMDES = record.NUMDES
  this.NUMVAL = record.NUMVAL
  this.NUMPV = record.NUMPV
}

Numeros.create = (newRecord, result) => {
  console.log(newRecord)
  sql.query("INSERT INTO numeros SET ?", newRecord, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newRecord })
  })
}

Numeros.findById = (id, result) => {
  sql.query(`SELECT * FROM numeros WHERE ID = ${id}`, (err, res) => {
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

Numeros.getAll = result => {
  sql.query("SELECT ID, NUMCOD, NUMDES, NUMVAL, NUMPV FROM numeros", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    result(null, res)
  })
}

Numeros.updateById = (id, record, result) => {
  sql.query(
    "UPDATE numeros SET NUMCOD = ?, NUMDES = ?, NUMVAL = ?, NUMPV = ? WHERE ID = ?",
    [record.NUMCOD, record.NUMDES, record.NUMVAL, record.NUMPV, id],
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

      result(null, { id: id, ...record })
    }
  )
}

Numeros.remove = (id, result) => {
  sql.query("DELETE FROM numeros WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    result(null, res)
  })
}

Numeros.removeAll = result => {
  sql.query("DELETE FROM numeros", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    result(null, res)
  })
}

module.exports = Numeros