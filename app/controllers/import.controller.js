const { count } = require('console')
const fs = require('fs') // Función de node que permite acceder al sistema de achivos (file system)
const sourceFolder = 'C:/Users/Omar/Documents/excite'
exports.import = (req, res) => {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceFolder, (err, files) => {
      files.filter(file => file.endsWith('csv')).map(file => {
        const records = []
        let counter = 0
        const csv = fs.readFileSync(`${sourceFolder}/${file}`, 'utf-8')
        const lines = csv.split(/\r?\n/)
        const header = lines[0].split(',').filter(field => field.replace(/\s/g, '') !== '""').map(field => field.replace(/"/g, ''))
        lines.map((line, index) => {
          if (index > 0) {
            let record = {}
            const fields = line.split(',').map(field => field.replace(/"/g, ''))
            header.map((field, idx) => {

              if (field !== 'CLIOBS') {

                let value = fields[idx] || ''
                value = value !== 'NaN' ? value : ''
                value = value.replace(/�/g, '').replace(/�/g, '').replace(/\u0000/g, '').replace(/\u0003/g, '').replace(/\u0004/g, '')

                switch (field) {
                  case 'CLICOD':
                  case 'TRACOD':
                  case 'LOCCOD':
                    record[field] = parseInt(value)
                    break
                  case 'CLISALDEB':
                  case 'CLISALHAB':
                  case 'CLISALIMP':
                    record[field] = parseFloat(value) || 0
                    break
                  default:
                    record[field] = value
                }
              }
            })

            if (record.CLICOD) {
              records.push(record)
              counter++
            }
          }
        })
        res.status(200).json({ message: 'Ok', counter, records })
      })
    })
  })
}