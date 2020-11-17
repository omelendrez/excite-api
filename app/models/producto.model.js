const sql = require("./db.js")

const Producto = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Producto.create = (newCustomer, result) => {
  sql.query("INSERT INTO producto SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Producto.findById = (customerId, result) => {
  sql.query(`SELECT * FROM producto WHERE id = ${customerId}`, (err, res) => {
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

Producto.getAll = result => {
  sql.query("SELECT * FROM producto", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("producto: ", res)
    result(null, res)
  })
}

Producto.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE producto SET code = ?, name = ?, active = ? WHERE id = ?",
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

Producto.remove = (id, result) => {
  sql.query("DELETE FROM producto WHERE id = ?", id, (err, res) => {
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

Producto.removeAll = result => {
  sql.query("DELETE FROM producto", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} producto`)
    result(null, res)
  })
}

module.exports = Producto