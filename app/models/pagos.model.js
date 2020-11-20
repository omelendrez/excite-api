const sql = require("./db.js")

const NUMCOD = 5

const Pagos = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Pagos.create = (newCustomer, result) => {
  sql.query("INSERT INTO pagos SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Pagos.findById = (id, result) => {
  sql.query(`SELECT * FROM pagos WHERE id = ${id}`, (err, res) => {
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

Pagos.getAll = result => {
  sql.query("SELECT * FROM pagos", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("pagos: ", res)
    result(null, res)
  })
}

Pagos.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE pagos SET code = ?, name = ?, active = ? WHERE id = ?",
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

Pagos.remove = (id, result) => {
  sql.query("DELETE FROM pagos WHERE id = ?", id, (err, res) => {
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

Pagos.removeAll = result => {
  sql.query("DELETE FROM pagos", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} pagos`)
    result(null, res)
  })
}

module.exports = Pagos