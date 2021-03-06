const fs = require('fs')
const fields = require('./models/db/fields.json')
const sql = require('./models/db/db')

exports.isField = field => {
  return fields.filter(field => field.type !== 'IGNORE').find(fld => fld.name === field)
}

exports.formatCreateField = fieldName => {
  if (fieldName === 'ID') {
    return `${fieldName} INTEGER NOT NULL AUTO_INCREMENT`
  }

  const field = fields.find(fld => fld.name === fieldName)
  const result = [field.name]
  if (field.type) {
    result.push(field.type)
  }
  if (field.size) {
    result.push(`(${field.size})`)
  }
  if (field.null) {
    result.push(field.null)
  }
  if (field.default !== null) {
    result.push(`DEFAULT ${field.default}`)
  }
  return result.join(' ')
}

exports.addIndex = (fieldName, indexes) => {
  const field = fields.find(fld => fld.name === fieldName)
  if (field.index) {
    indexes.push(`INDEX (${fieldName})`)
  }
  return indexes
}

exports.formatField = field => {

  let { name, value } = field
  value = value || ''
  value = value !== 'NaN' ? value : ''
  value = value
    .replace(/�/g, '')
    .replace(/�/g, '?')
    .replace(/\u0000/g, '')
    .replace(/\u0003/g, '')
    .replace(/\u0004/g, '')
    .replace(/"/g, '')
    .replace(/\\/g, '')

  const fieldObject = fields.find(fld => fld.name === name)
  let result = ''
  switch (fieldObject.type) {
    case 'DATE':
      result = value ? `"${value.substr(0, 4)}-${value.substr(4, 2)}-${value.substr(6, 2)}"` : 'NULL'
      break
    case 'INTEGER':
      result = parseInt(value) || 0
      break
    case 'DECIMAL':
      result = parseFloat(value) || 0
      break
    default:
      result = `"${value}"`
  }

  return result

}

exports.findNumber = (code, result) => {
  sql.query(`SELECT * FROM numeros WHERE NUMCOD = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log("found record: ", res[0])
      result(null, res[0])
      return
    }

    result({ kind: "not_found" }, null)
  })
}

exports.updateNumber = (code, value) => {
  sql.query(`UPDATE numeros SET NUMVAL = ${value} WHERE NUMCOD = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
    }
  })
}

