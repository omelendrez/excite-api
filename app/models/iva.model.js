const sql = require("./db.js")

const Iva = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Iva.create = (newCustomer, result) => {
  sql.query("INSERT INTO iva SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Iva.findById = (id, result) => {
  sql.query(`SELECT * FROM iva WHERE id = ${id}`, (err, res) => {
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

Iva.getAll = result => {
  sql.query("SELECT * FROM iva", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("iva: ", res)
    result(null, res)
  })
}

Iva.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE iva SET code = ?, name = ?, active = ? WHERE id = ?",
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

Iva.remove = (id, result) => {
  sql.query("DELETE FROM iva WHERE id = ?", id, (err, res) => {
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

Iva.removeAll = result => {
  sql.query("DELETE FROM iva", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} iva`)
    result(null, res)
  })
}

module.exports = Iva