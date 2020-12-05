const sql = require("./db/db")
const { findNumber, updateNumber } = require("../helpers")
const numeros = require('./db/numeros')

const Model = function (record) {
  const keys = Object.keys(record)
  keys.map(key => this[key] = record[key])
}

Model.create = (newRecord, result, model) => {
  const numero = numeros.find(numero => numero.model === model)
  if (numero) {
    findNumber(numero.NUMCOD, (err, data) => {
      const value = data.NUMVAL + 1
      newRecord[numero.field] = value
      sql.query(`INSERT INTO ${model} SET ?`, newRecord, (err, res) => {
        if (err) {
          console.log("error: ", err)
          result(err, null)
          return
        }
        updateNumber(NUMCOD, value)
        result(null, { id: res.insertId, ...newRecord })
      })
    })
  } else {
    sql.query(`INSERT INTO ${model} SET ?`, newRecord, (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(err, null)
        return
      }
      result(null, { id: res.insertId, ...newRecord })
    })
  }
}

Model.findById = (id, result, model) => {
  const sqlQuery = `SELECT * FROM ${model} WHERE ID = ${id}`
  sql.query(sqlQuery, (err, res) => {
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

Model.getAll = (query, result, model) => {
  const { search } = query
  let sqlQuery = ''
  switch (model) {
    case 'ajustest':
      sqlQuery = `SELECT a.ID, a.AJUNUM, a.AJUFEC, a.PRODCOD, p.PRODDES, a.AJUCAN FROM ajustest AS a INNER JOIN producto AS p ON p.PRODCOD = a.PRODCOD ORDER BY a.AJUNUM DESC;`
      break
    case 'clientes':
      sqlQuery = `SELECT c.ID, CLICOD, CLINOM, CLIDOM, CLILOC, CLICUIT, CLITEL, CLICEL, CLICP, CLIFP, CLIINT, i.IVADES FROM clientes c INNER JOIN iva i ON c.IVACOD = i.IVACOD ${search ? 'WHERE CONCAT(CLINOM," ",CLILOC," ",CLIDOM," ",CLITEL," ",CLICEL) LIKE "%' + search + '%"' : ''};`
      break
    case 'concepto':
      sqlQuery = `SELECT c.ID, c.CONNUM, c.CONFEC, c.CONDES, c.CONCLI, cl.CLINOM, c.CONCANDEB, c.CONCANHAB FROM concepto c INNER JOIN clientes cl ON c.CONCLI = cl.CLICOD ORDER BY c.CONNUM DESC;`
      break
    case 'estados':
      sqlQuery = `SELECT * FROM estados;`
      break
    case 'facturas':
      sqlQuery = `SELECT * FROM facturas;`
      break
    case 'iva':
      sqlQuery = `SELECT ID, IVACOD, IVADES FROM iva;`
      break
    case 'numeros':
      sqlQuery = `SELECT ID, NUMCOD, NUMDES, NUMVAL, NUMPV FROM numeros`
      break
    case 'pagos':
      sqlQuery = `SELECT p.ID, p.PAGNUM, p.PAGFEC, c.CLICOD, c.CLINOM, (SELECT  IFNULL(SUM(PAGIMP), 0) FROM pagos2 WHERE PAGNUM <> 0 AND PAGNUM = p.PAGNUM) TOTAL FROM pagos p INNER JOIN clientes c ON p.CLICOD = c.CLICOD WHERE p.PAGNUM <> 0 ORDER BY p.ID DESC;`
      break
    case 'porciva':
      sqlQuery = `SELECT ID, IVAFEC, IVAPOR FROM porciva;`
      break
    case 'producto':
      sqlQuery = `SELECT p.ID, p.PRODCOD, p.PRODDES, p.TIPCOD, t.TIPDES, p.SUBTIPCOD, t1.SUBTIPDES, p.PRODPRE, p.PRODSEX, P.PRODSTO, P.PRODSINI, p.PRODCOM, CASE p.PRODEST WHEN 'A' THEN 'Activo' WHEN 'I' THEN 'Inactivo' ELSE p.PRODEST END PRODEST FROM producto p INNER JOIN tipo t ON p.TIPCOD = t.TIPCOD LEFT JOIN tipo1 t1 ON p.SUBTIPCOD = t1.SUBTIPCOD ${search ? 'WHERE CONCAT(p.PRODCOD," ",p.PRODDES) LIKE "%' + search + '%"' : ''} ORDER BY p.PRODCOD;`
      break
    case 'provinci':
      sqlQuery = `SELECT * FROM provinci;`
      break
    case 'remitos':
      sqlQuery = `SELECT r.ID, r.REMNUM, r.REMFEC, e.ESTDES, r.VENCOD, v.VENNOM, r.CLICOD, c.CLINOM, r.REMFACNUM, r.REMPAGNUM, r.REMDES FROM remitos r INNER JOIN estados e ON r.ESTCOD = e.ESTCOD INNER JOIN vendedor v ON r.VENCOD = v.VENCOD INNER JOIN clientes c ON r.CLICOD = c.CLICOD WHERE REMNUM <> 0 ORDER BY r.REMNUM DESC;`
      break
    case 'tipo':
      sqlQuery = `SELECT ID, TIPCOD, TIPDES FROM tipo;`
      break
    case 'tipo1':
      sqlQuery = `SELECT ID, TIPCOD, SUBTIPCOD, SUBTIPDES FROM tipo1;`
      break
    case 'transpor':
      sqlQuery = `SELECT ID, TRACOD, TRANOM, TRADOM, TRALOC, TRATEL, TRAOBS, TRACUIT FROM transpor;`
      break
    case 'vendedor':
      sqlQuery = `SELECT ID, VENCOD, VENNOM, VENDOM, VENLOC, VENTEL, VENCEL, VENOBS, VENCP FROM vendedor;`
      break
  }
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

Model.updateById = (id, record, result, model) => {
  if (record.AJUFEC) {
    record.AJUFEC = record.AJUFEC.split('T')[0]
  }
  if (record.CLISALFEC) {
    record.CLISALFEC = record.CLISALFEC.split('T')[0]
  }
  if (record.CONFEC) {
    record.CONFEC = record.CONFEC.split('T')[0]
  }
  if (record.IVAFEC) {
    record.IVAFEC = record.IVAFEC.split('T')[0]
  }

  const fields = []
  const values = []
  Object.keys(record).filter(field => field != 'ID').map(field => {
    fields.push(`${field} = ?`)
    values.push(record[field])
  })
  values.push(id)
  sql.query(`UPDATE ${model} SET ${fields.join(',')}  WHERE ID = ?`,
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

Model.remove = (id, result, model) => {
  const sqlQuery = `DELETE FROM ${model} WHERE ID = ?`

  sql.query(sqlQuery, id, (err, res) => {
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

Model.removeAll = (result, model) => {
  sql.query(`DELETE FROM ${model}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Model