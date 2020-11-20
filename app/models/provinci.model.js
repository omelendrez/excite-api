const sql = require("./db.js")

const Provinci = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Provinci.create = (newCustomer, result) => {
  sql.query("INSERT INTO provinci SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Provinci.findById = (id, result) => {
  sql.query(`SELECT * FROM provinci WHERE id = ${id}`, (err, res) => {
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

Provinci.getAll = result => {
  sql.query("SELECT * FROM provinci", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("provinci: ", res)
    result(null, res)
  })
}

Provinci.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE provinci SET code = ?, name = ?, active = ? WHERE id = ?",
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

Provinci.remove = (id, result) => {
  sql.query("DELETE FROM provinci WHERE id = ?", id, (err, res) => {
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

Provinci.removeAll = result => {
  sql.query("DELETE FROM provinci", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} provinci`)
    result(null, res)
  })
}

module.exports = Provinci