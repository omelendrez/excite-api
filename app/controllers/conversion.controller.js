const { dataConversion } = require('../models/conversion.model')

const tableList = [
  'AJUSTEST',
  'CLIENTE1',
  'CLIENTES',
  'CONCEPTO',
  'ESTADOS',
  'FACTURA1',
  'FACTURAS',
  'IVA',
  'numeros',
  'PAGOS',
  'PAGOS1',
  'PAGOS2',
  'PORCIVA',
  'PRODUCTO',
  'PROVINCI',
  'REMIITEM',
  'REMITOS',
  'TIPO',
  'TIPO1',
  'transpor',
  'VENDEDO1',
  'VENDEDOR'
]

exports.convert = (req, res) => {
  tableList.map(table => dataConversion(table, (result) => console.log(result)))
  res.json('ok')
}
