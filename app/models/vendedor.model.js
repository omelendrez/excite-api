const sql = require("./db.js")

const Vendedor = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Vendedor.create = (newCustomer, result) => {
  sql.query("INSERT INTO vendedor SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Vendedor.findById = (customerId, result) => {
  sql.query(`SELECT * FROM vendedor WHERE id = ${customerId}`, (err, res) => {
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

Vendedor.getAll = result => {
  sql.query("SELECT * FROM vendedor", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("vendedor: ", res)
    result(null, res)
  })
}

Vendedor.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE vendedor SET code = ?, name = ?, active = ? WHERE id = ?",
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

Vendedor.remove = (id, result) => {
  sql.query("DELETE FROM vendedor WHERE id = ?", id, (err, res) => {
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

Vendedor.removeAll = result => {
  sql.query("DELETE FROM vendedor", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} vendedor`)
    result(null, res)
  })
}

module.exports = Vendedor