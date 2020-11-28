const sql = require("./db.js")

const Porciva = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Porciva.create = (newCustomer, result) => {
  sql.query("INSERT INTO porciva SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newCustomer })
  })
}

Porciva.findById = (id, result) => {
  sql.query(`SELECT * FROM porciva WHERE id = ${id}`, (err, res) => {
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

Porciva.getAll = result => {
  sql.query("SELECT ID, IVAFEC, IVAPOR FROM porciva", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Porciva.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE porciva SET code = ?, name = ?, active = ? WHERE id = ?",
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

Porciva.remove = (id, result) => {
  sql.query("DELETE FROM porciva WHERE id = ?", id, (err, res) => {
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

Porciva.removeAll = result => {
  sql.query("DELETE FROM porciva", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Porciva