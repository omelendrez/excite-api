const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const { formatField, ignoreFields, formatCreateField } = require('../helpers')

const readDBFFiles = () => {
  const create = []
  const insert = []
  const sourceFolder = path.join(__dirname, '../../db')
  fs.readdir(sourceFolder, ((err, files) => {
    files.map(fileName => {
      const file = fileName.replace('.DBF', '')
      execSync(`node-dbf convert ${sourceFolder}/${file}.DBF > ${file}.csv`)
      const csv = fs.readFileSync(`${file}.csv`, 'utf-8')
      /*
      fs.unlink(`${file}.csv`, err => {
        if (err) {
          console.log(err)
        }
      })
      */
      const lines = csv.split(/\r?\n/)
      const header = lines[0].split(',').filter(field => field.replace(/\s/g, '') !== '""').map(field => field.replace(/"/g, '')).filter(field => !ignoreFields.includes(field))
      const columns = []
      const records = []
      create.push(`DROP TABLE IF EXISTS ${file}; CREATE TABLE ${file} (`)
      insert.push(`INSERT INTO ${file} (ID,${header.join(',')}) VALUES `)
      let id = 1
      columns.push(formatCreateField('ID'))
      header.map((field) => {
        columns.push(formatCreateField(field))
      })
      columns.push('PRIMARY KEY (ID)')
      create.push(columns.join(',') + ');')
      lines.map((line, index) => {
        if (index > 0 && index < lines.length - 1) {
          const record = []
          const fields = line.split('","')
          record.push(id)
          header.map((field, idx) => {
            const data = { name: field, value: fields[idx] }
            record.push(formatField(data))
          })
          records.push('(' + record.join(',') + ')')
          id++
        }
      })
      insert.push(records.join(',') + ';')
    })
  }))
  fs.writeFile('create.sql', create.join(''), err => {
    if (err) {
      return console.log(err)
    }
    console.log('Create done')
  })
  fs.writeFile('insert.sql', insert.join(''), err => {
    if (err) {
      return console.log(err)
    }
    console.log('Insert done')
  })
}

exports.import = (req, res) => {
  readDBFFiles()
  res.json({ message: 'Ok' })
}