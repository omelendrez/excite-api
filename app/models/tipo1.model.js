const sql = require("./db.js")

const Tipo1 = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Tipo1.create = (newCustomer, result) => {
  sql.query("INSERT INTO tipo1 SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Tipo1.findById = (id, result) => {
  sql.query(`SELECT * FROM tipo1 WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log("found customer: ", res[0])
      result(null, res[0])
      return
    }

    result({ kind: "not_found" }, null)
  })
}

Tipo1.getAll = result => {
  sql.query("SELECT ID, TIPCOD, SUBTIPCOD, SUBTIPDES FROM tipo1", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("tipo1: ", res)
    result(null, res)
  })
}

Tipo1.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE tipo1 SET code = ?, name = ?, active = ? WHERE id = ?",
    [customer.code, customer.name, customer.active, id],
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

      console.log("updated customer: ", { id: id, ...customer })
      result(null, { id: id, ...customer })
    }
  )
}

Tipo1.remove = (id, result) => {
  sql.query("DELETE FROM tipo1 WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    console.log("deleted customer with id: ", id)
    result(null, res)
  })
}

Tipo1.removeAll = result => {
  sql.query("DELETE FROM tipo1", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} tipo1`)
    result(null, res)
  })
}

module.exports = Tipo1