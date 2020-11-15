const sql = require("./db.js")

const Cliente = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Cliente.create = (newCustomer, result) => {
  sql.query("INSERT INTO clientes SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Cliente.findById = (customerId, result) => {
  sql.query(`SELECT * FROM clientes WHERE id = ${customerId}`, (err, res) => {
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

Cliente.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE clientes SET code = ?, name = ?, active = ? WHERE id = ?",
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

    console.log("deleted customer with id: ", id)
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