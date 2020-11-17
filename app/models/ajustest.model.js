const sql = require("./db.js")

const Ajustest = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Ajustest.create = (newCustomer, result) => {
  sql.query("INSERT INTO ajustest SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Ajustest.findById = (customerId, result) => {
  sql.query(`SELECT * FROM ajustest WHERE id = ${customerId}`, (err, res) => {
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

Ajustest.getAll = result => {
  sql.query("SELECT * FROM ajustest", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("ajustest: ", res)
    result(null, res)
  })
}

Ajustest.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE ajustest SET code = ?, name = ?, active = ? WHERE id = ?",
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

Ajustest.remove = (id, result) => {
  sql.query("DELETE FROM ajustest WHERE id = ?", id, (err, res) => {
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