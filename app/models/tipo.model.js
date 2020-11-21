const sql = require("./db.js")

const Tipo = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Tipo.create = (newCustomer, result) => {
  sql.query("INSERT INTO tipo SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Tipo.findById = (id, result) => {
  sql.query(`SELECT * FROM tipo WHERE id = ${id}`, (err, res) => {
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

Tipo.getAll = result => {
  sql.query("SELECT * FROM tipo", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("tipo: ", res)
    result(null, res)
  })
}

Tipo.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE tipo SET code = ?, name = ?, active = ? WHERE id = ?",
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

Tipo.remove = (id, result) => {
  sql.query("DELETE FROM tipo WHERE id = ?", id, (err, res) => {
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

Tipo.removeAll = result => {
  sql.query("DELETE FROM tipo", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} tipo`)
    result(null, res)
  })
}

module.exports = Tipo