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
    name: 'CLILOC',
    size: 25
  },
  {
    name: 'CLICUIT',
    size: 20
  },
  {
    name: 'CLITEL',
    size: 20
  },
  {
    name: 'CLICEL',
    size: 20
  },
  {
    name: 'CLICP',
    size: 8
  },
  {
    name: 'CLIFP',
    size: 25
  },
  {
    name: 'CLIINT',
    size: 12
  },
  {
    name: 'IVACOD',
    size: 1
  },
  {
    name: 'CLIFAN',
    size: 35
  },
  {
    name: 'PROCOD',
    size: 1
  },
  {
    name: 'CLITIPO',
    size: 1
  },
  {
    name: 'CONDES',
    size: 45
  },
  {
    name: 'ESTCOD',
    size: 1
  },
  {
    name: 'ESTDES',
    size: 25
  },
  {
    name: 'FACLET',
    size: 1
  },
  {
    name: 'ESTCOD',
    size: 1
  },
  {
    name: 'IVADES',
    size: 25
  },
  {
    name: 'PAGTIP',
    size: 10
  },
  {
    name: 'PAGCHENUM',
    size: 12
  },
  {
    name: 'PAGCHEBAN',
    size: 25
  },
  {
    name: 'PAGCHEEST',
    size: 1
  },
  {
    name: 'COMCOD',
    size: 8
  },
  {
    name: 'TRAOBS',
    size: 60
  },
  {
    name: 'VENOBS',
    size: 60
  },
  {
    name: 'PRODCOD',
    size: 8
  },
  {
    name: 'PRODDES',
    size: 25
  },
  {
    name: 'TIPCOD',
    size: 1
  },
  {
    name: 'PRODSEX',
    size: 10
  },
  {
    name: 'SUBTIPCOD',
    size: 3
  },
  {
    name: 'PRODEST',
    size: 1
  },
  {
    name: 'PRODCOM',
    size: 1
  },
  {
    name: 'PRONOM',
    size: 25
  },
  {
    name: 'REMFACLET',
    size: 1
  },
  {
    name: 'REMEMI',
    size: 1
  },
  {
    name: 'TIPDES',
    size: 15
  },
  {
    name: 'SUBTIPDES',
    size: 25
  },
  {
    name: 'TRANOM',
    size: 25
  },
  {
    name: 'TRADOM',
    size: 25
  },
  {
    name: 'TRALOC',
    size: 25
  },
  {
    name: 'TRATEL',
    size: 20
  },
  {
    name: 'TRAPROCOD',
    size: 1
  },
  {
    name: 'TRACUIT',
    size: 20
  },
  {
    name: 'VENNOM',
    size: 25
  },
  {
    name: 'VENDOM',
    size: 25
  },
  {
    name: 'VENLOC',
    size: 25
  },
  {
    name: 'VENTEL',
    size: 20
  },
  {
    name: 'VENCEL',
    size: 20
  },
  {
    name: 'VENINT',
    size: 12
  },
  {
    name: 'VENCP',
    size: 8
  }
]

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

  if (dateFields.includes(name)) {
    if (value === '') {
      return `NULL`
    } else {
      return `"${value.substr(0, 4)}-${value.substr(4, 2)}-${value.substr(6, 2)}"`
    }
  }

  return `"${value}"`

}