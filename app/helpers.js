const intFields = [
  'AJUNUM',
  'AJUCAN',
  'CLICOD',
  'TRACOD',
  'LOCCOD',
  'CONNUM',
  'CONCLI',
  'CONVEN',
  'FACPV',
  'FACNUM',
  'FACCAN',
  'FACPV',
  'FACNUM',
  'FACREMNUM',
  'USUCOD',
  'VENCOD',
  'FACOFINUM',
  'PAGNUM',
  'REMNUM',
  'PAGSEC',
  'COMCAN',
  'PRODSTO',
  'PRODSINI',
  'REMCAN',
  'REMPED',
  'REMFACNUM',
  'REMPAGNUM',
  'REMLIQNUM',
  'REMFACPV'
]

const floatFields = [
  'CLIPRODPRE',
  'CLISALDEB',
  'CLISALHAB',
  'CLISALIMP',
  'CONCANDEB',
  'CONCANHAB',
  'FACPRE',
  'FACIVA',
  'FACNET',
  'FACDES',
  'PAGIMP',
  'IVAPOR',
  'PRODPRE',
  'REMPRE',
  'REMDES',
  'VENCOM',
  'VENSALDEB',
  'VENSALHAB',
  'VENSALIMP'
]

const dateFields = [
  'AJUFEC',
  'CLISALFEC',
  'CONFEC',
  'FACFEC',
  'PAGFEC',
  'IVAFEC',
  'REMFEC',
  'VENFECSAL'
]

exports.ignoreFields = [
  'CLIOBS',
  'AJUOBS',
  'PAGOBS'
]

const textFields = [
  {
    name: 'CLINOM',
    size: 35
  },
  {
    name: 'CLIDOM',
    size: 35
  },
  {
    name: 'CLIFAN',
    size: 35
  },
  {
    name: 'CONDES',
    size: 45
  },
  {
    name: 'TRAOBS',
    size: 60
  },
  {
    name: 'VENOBS',
    size: 60
  }
]

exports.formatCreateField = field => {
  let type = ''
  if (field === 'ID') {
    return `${field} INTEGER NOT NULL AUTO_INCREMENT`
  }
  if (intFields.includes(field)) {
    return `${field} INTEGER NOT NULL`
  }
  if (floatFields.includes(field)) {
    return `${field} DECIMAL(10, 2) DEFAULT 0`
  }
  let textField = textFields.find(text => text.name === field)
  if (!textField) {
    textField = {
      size: 30
    }
  }
  return `${field} VARCHAR(${textField.size}) NOT NULL`
}

exports.formatField = field => {
  let { name, value } = field
  value = value || ''
  value = value !== 'NaN' ? value : ''
  value = value.replace(/�/g, '').replace(/�/g, '').replace(/\u0000/g, '').replace(/\u0003/g, '').replace(/\u0004/g, '').replace(/"/g, '').replace(/\\/g, '')

  if (intFields.includes(name)) {
    return parseInt(value) || 0
  }

  if (floatFields.includes(name)) {
    return parseFloat(value) || 0
  }

  if (dateFields.includes(name)) {
    return `"${value.substr(0, 4)}-${value.substr(5, 2)}-${value.substr(6, 2)}"`
  }

  return `"${value}"`

}