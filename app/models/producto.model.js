const sql = require("./db.js")

const Producto = function (record) {
  const keys = Object.keys(record)
  keys.map(key => this[key] = record[key])
}

Producto.create = (newRecord, result) => {
  sql.query("INSERT INTO producto SET ?", newRecord, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newRecord })
  })
}

Producto.findById = (id, result) => {
  sql.query(`SELECT * FROM producto WHERE id = ${id}`, (err, res) => {
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

Producto.getAll = result => {
  const sqlQuery = `SELECT 
  p.ID,
  p.PRODCOD,
  p.PRODDES,
  p.TIPCOD,
  t.TIPDES,
  p.SUBTIPCOD,
  t1.SUBTIPDES,
  p.PRODPRE,
  p.PRODSEX,
  P.PRODSTO,
  P.PRODSINI,
  p.PRODCOM,
  CASE p.PRODEST
      WHEN 'A' THEN 'Activo'
      WHEN 'I' THEN 'Inactivo'
      ELSE p.PRODEST
  END PRODEST
FROM
  producto p
      INNER JOIN
  tipo t ON p.TIPCOD = t.TIPCOD
      LEFT JOIN
  tipo1 t1 ON p.SUBTIPCOD = t1.SUBTIPCOD
ORDER BY p.PRODCOD;`
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Producto.updateById = (id, record, result) => {
  const fields = []
  const values = []
  Object.keys(record).filter(field => field != 'ID').map(field => {
    fields.push(`${field} = ?`)
    values.push(record[field])
  })
  values.push(id)
  sql.query(`UPDATE producto SET ${fields.join(',')}  WHERE ID = ?`,
    values,
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

      result(null, { id: id, ...record })
    }
  )
}

Producto.remove = (id, result) => {
  sql.query("DELETE FROM producto WHERE id = ?", id, (err, res) => {
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

Producto.removeAll = result => {
  sql.query("DELETE FROM producto", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Producto