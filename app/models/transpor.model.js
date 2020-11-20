const sql = require("./db.js")

const Transpor = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Transpor.create = (newCustomer, result) => {
  sql.query("INSERT INTO transpor SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer })
    result(null, { id: res.insertId, ...newCustomer })
  })
}

Transpor.findById = (id, result) => {
  sql.query(`SELECT * FROM transpor WHERE id = ${id}`, (err, res) => {
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

Transpor.getAll = result => {
  sql.query("SELECT * FROM transpor", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    //console.log("transpor: ", res)
    result(null, res)
  })
}

Transpor.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE transpor SET code = ?, name = ?, active = ? WHERE id = ?",
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

Transpor.remove = (id, result) => {
  sql.query("DELETE FROM transpor WHERE id = ?", id, (err, res) => {
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

Transpor.removeAll = result => {
  sql.query("DELETE FROM transpor", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} transpor`)
    result(null, res)
  })
}

module.exports = Transpor