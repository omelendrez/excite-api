const sql = require("./db.js")

const NUMCOD = 22

const Facturas = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Facturas.create = (newCustomer, result) => {
  sql.query("INSERT INTO facturas SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newCustomer })
  })
}

Facturas.findById = (id, result) => {
  sql.query(`SELECT * FROM facturas WHERE id = ${id}`, (err, res) => {
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

Facturas.getAll = result => {
  sql.query("SELECT * FROM facturas", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Facturas.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE facturas SET code = ?, name = ?, active = ? WHERE id = ?",
    [customer.code, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null)
        return
      }

      result(null, { id: id, ...customer })
    }
  )
}

Facturas.remove = (id, result) => {
  sql.query("DELETE FROM facturas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    result(null, res)
  })
}

Facturas.removeAll = result => {
  sql.query("DELETE FROM facturas", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Facturas