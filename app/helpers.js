const intFields = require('../db/intFields.json')

const floatFields = require('../db/floatFields.json')

const dateFields = require('../db/dateFields.json')
const ignoreFields = require('../db/ignoreFields.json')

const textFields = require('../db/textFields.json')

exports.isField = field => {
  return !ignoreFields.includes(field) && (floatFields.includes(field) || intFields.includes(field) || dateFields.includes(field) || textFields.find(fld => fld.name === field))
}

exports.formatCreateField = field => {
  if (field === 'ID') {
    return `${field} INTEGER NOT NULL AUTO_INCREMENT`
  }
  if (dateFields.includes(field)) {
    return `${field} DATETIME DEFAULT NULL`
  }
  if (intFields.includes(field)) {
    return `${field} INTEGER NOT NULL`
  }
  if (floatFields.includes(field)) {
    return `${field} DECIMAL(10, 2) DEFAULT 0`
  }
  let textField = textFields.find(text => text.name === field)

  return `${field} VARCHAR(${textField.size}) NOT NULL`
}

exports.formatField = field => {

  let { name, value } = field
  value = value || ''
  value = value !== 'NaN' ? value : ''
  value = value.replace(/�/g, '')
    .replace(/�/g, '?')
    .replace(/\u0000/g, '')
    .replace(/\u0003/g, '')
    .replace(/\u0004/g, '')
    .replace(/"/g, '')
    .replace(/\\/g, '')

  if (intFields.includes(name)) {
    return parseInt(value) || 0
  }

  if (floatFields.includes(name)) {
    return parseFloat(value) || 0
  }

  const fieldObject = textFields.find(field => field.name === name)
  if (fieldObject) {
    if (value.length > fieldObject.size) {
      return 'error'
    }
  }

  if (dateFields.includes(name)) {
    if (value === '') {
      return `NULL`
    } else {
      return `"${value.substr(0, 4)}-${value.substr(4, 2)}-${value.substr(6, 2)}"`
    }
  }

  return `"${value}"`

}
