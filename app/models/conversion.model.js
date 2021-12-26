const fs = require('fs')
const { DBFFile } = require('dbffile')
const {
  formatField,
  formatCreateField,
  addIndex,
  isField
} = require('../helpers')

// const pool = require("./db/pool")

const PATH = 'C:/Users/Omar/Documents/excite/db/'

exports.dataConversionX = async () => {
  let dbf = await DBFFile.open('C:/Users/Omar/Documents/excite/db_20211201/CLIENTES.DBF', { includeDeletedRecords: false })
  console.log(`DBF file contains ${dbf.recordCount} records.`)
  console.log(`Field names: ${dbf.fields.map(f => f.name).join(', ')}`)
  console.log(`Last update: ${dbf.dateOfLastUpdate}`)
  for (let i = 0; i < dbf.recordCount; i++) {
    let records = await dbf.readRecords(1)
    console.log(records)
    console.log(i)
    i++
  }

  //  for (let record of records) console.log(record)
}

exports.dataConversion = async (fileName, results) => {
  const file = `${PATH}${fileName}.DBF`
  const openOptions = {
    readMode: 'loose',
    encoding: 'ISO-8859-1',
    includeDeletedRecords: false
  }

  const output = [`DROP TABLE IF EXISTS \`${fileName}\`; CREATE TABLE \`${fileName}\` (`]


  const dbf = await DBFFile.open(file, openOptions)
  const batchSize = 1000
  const fields = dbf.fields
  const columns = []
  let indexes = []
  columns.push(formatCreateField('ID'))
  fields.map((field) => {
    if (!isField(field.name)) {
      console.log(field)
    }
    if (field.size && isField(field.name)) {
      columns.push(formatCreateField(field.name))
      indexes = addIndex(field.name, indexes)
    }
  })
  columns.push('PRIMARY KEY (ID)')
  output.push(columns.join(',') + ');')
  output.push(`INSERT INTO \`${fileName}\` (${fields.map(field => field.name).join(',')}) VALUES `)
  let rowsRemaining = dbf.recordCount

  let records = []
  let read = 0

  try {
    while (rowsRemaining > 0) {
      const rowsToRead = rowsRemaining > batchSize ? batchSize : rowsRemaining
      const rows = await dbf.readRecords(rowsToRead)
      rows.map(row => {
        const record = []
        fields.map((field) => {
          if (isField(field.name)) {
            const data = { name: field.name, value: row[field.name] }
            const formattedField = formatField(data)
            record.push(formattedField)
          }
        })
        records.push('(' + record.join(',') + ')')
      })
      read += rows.length
      rowsRemaining -= rowsToRead
    }
    output.push(records.join(','))

    console.log(output.join(''))

    // fs.writeFile(`./app/conversion/${fileName}.sql`, output.join(''), (err) => {
    //   if (err) {
    //     return console.log(err)
    //   }
    //   console.log('Data conversion completed!')
    // })

    results({ fileName, records: dbf.recordCount, read })
    records = []

  } catch (error) {
    console.log(error)
    results({ fileName, error: error.code })
  }

}
