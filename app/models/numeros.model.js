const sql = require("./db.js")

const Numeros = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Numeros.create = (newCustomer, result) => {
  sql.query("INSERT INTO numeros SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Numeros.findById = (customerId, result) => {
  sql.query(`SELECT * FROM numeros WHERE id = ${customerId}`, (err, res) => {
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

Numeros.getAll = result => {
  sql.query("SELECT * FROM numeros", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("numeros: ", res)
    result(null, res)
  })
}

Numeros.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE numeros SET code = ?, name = ?, active = ? WHERE id = ?",
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

Numeros.remove = (id, result) => {
  sql.query("DELETE FROM numeros WHERE id = ?", id, (err, res) => {
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

Numeros.removeAll = result => {
  sql.query("DELETE FROM numeros", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} numeros`)
    result(null, res)
  })
}

module.exports = Numeros