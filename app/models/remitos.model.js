const sql = require("./db.js")

const NUMCOD = 2

const Remitos = function (customer) {
  this.code = customer.code
  this.name = customer.name
  this.active = customer.active
}

Remitos.create = (newCustomer, result) => {
  sql.query("INSERT INTO remitos SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newCustomer })
  })
}

Remitos.findById = (id, result) => {
  sql.query(`SELECT * FROM remitos WHERE id = ${id}`, (err, res) => {
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

Remitos.getAll = result => {
  const sqlQuery = `SELECT r.ID, r.REMNUM, r.REMFEC,
  e.ESTDES,
  r.VENCOD,
  v.VENNOM,
  r.CLICOD,
  c.CLINOM,
  r.REMPAGNUM,
  r.REMDES
FROM
  remitos r
      INNER JOIN
  estados e ON r.ESTCOD = e.ESTCOD
      INNER JOIN
  vendedor v ON r.VENCOD = v.VENCOD
      INNER JOIN
  clientes c ON r.CLICOD = c.CLICOD
WHERE REMNUM <> 0
ORDER BY r.REMNUM DESC;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Remitos.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE remitos SET code = ?, name = ?, active = ? WHERE id = ?",
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

Remitos.remove = (id, result) => {
  sql.query("DELETE FROM remitos WHERE id = ?", id, (err, res) => {
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

Remitos.removeAll = result => {
  sql.query("DELETE FROM remitos", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Remitos