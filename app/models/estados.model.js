const sql = require("./db.js")

const Estados = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Estados.create = (newCustomer, result) => {
  sql.query("INSERT INTO estados SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Estados.findById = (id, result) => {
  sql.query(`SELECT * FROM estados WHERE id = ${id}`, (err, res) => {
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

Estados.getAll = result => {
  sql.query("SELECT * FROM estados", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("estados: ", res)
    result(null, res)
  })
}

Estados.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE estados SET code = ?, name = ?, active = ? WHERE id = ?",
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

Estados.remove = (id, result) => {
  sql.query("DELETE FROM estados WHERE id = ?", id, (err, res) => {
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

Estados.removeAll = result => {
  sql.query("DELETE FROM estados", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} estados`)
    result(null, res)
  })
}

module.exports = Estados