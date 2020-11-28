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
      result(null, res[0])
      return
    }

    result({ kind: "not_found" }, null)
  })
}

Pagos.getAll = result => {
  const sqlQuery = `SELECT p.ID, p.PAGNUM, p.PAGFEC, c.CLICOD, c.CLINOM, (SELECT  IFNULL(SUM(PAGIMP), 0) FROM pagos2 WHERE PAGNUM <> 0 AND PAGNUM = p.PAGNUM) TOTAL FROM pagos p INNER JOIN clientes c ON p.CLICOD = c.CLICOD WHERE p.PAGNUM <> 0 ORDER BY p.ID DESC;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

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

Pagos.remove = (id, result) => {
  sql.query("DELETE FROM pagos WHERE id = ?", id, (err, res) => {
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

Pagos.removeAll = result => {
  sql.query("DELETE FROM pagos", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Pagos