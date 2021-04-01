const fs = require("fs");
const path = require("path");
const { importData } = require("../models/import.model");
//const execSync = require('child_process').execSync
const {
  formatField,
  formatCreateField,
  addIndex,
  isField,
} = require("../helpers");

const readDBFFiles = () => {
  const PROCESS_NAME = "data-conversion";
  console.time(PROCESS_NAME);
  const create = [];
  const insert = [];
  const sourceFolder = path.join(__dirname, "../../db");
  fs.readdir(sourceFolder, (err, files) => {
    files.map((fileName) => {
      if (fileName.toUpperCase().includes("DBF")) {
        const file = fileName.toUpperCase().replace(".DBF", "");
        //execSync(`node-dbf convert ${sourceFolder}/${file}.DBF > ${sourceFolder}/${file}.CSV`)
        const csv = fs.readFileSync(`${sourceFolder}/${file}.CSV`, "utf-8");
        const lines = csv.split(/\r?\n/);
        const header = lines[0]
          .split('","')
          .map((field) => field.replace(/\"/g, ""));
        const columns = [];
        let indexes = [];
        const records = [];
        create.push(
          `DROP TABLE IF EXISTS \`${file}\`; CREATE TABLE \`${file}\` (`
        );
        insert.push(
          `INSERT INTO \`${file}\` (ID,${header
            .filter((field) => isField(field))
            .join(",")}) VALUES `
        );
        let id = 1;
        columns.push(formatCreateField("ID"));
        header.map((field) => {
          if (field.length && isField(field)) {
            columns.push(formatCreateField(field));
            indexes = addIndex(field, indexes);
          }
        });
        columns.push("PRIMARY KEY (ID)");
        if (indexes.length) {
          columns.push(indexes.join(","));
        }
        create.push(columns.join(",") + ");");
        console.log(file, lines.length - 2);
        lines.map((line, index) => {
          if (index > 0 && index < lines.length - 1) {
            const record = [];
            const fields = line
              .split('","')
              .map((field) => field.replace(/\"/g, ""));
            record.push(id);
            header.map((field, idx) => {
              if (isField(field)) {
                const data = { name: field, value: fields[idx] };
                const formattedField = formatField(data);
                record.push(formattedField);
              }
            });
            records.push("(" + record.join(",") + ")");
            id++;
          }
        });
        insert.push(records.join(",") + ";");
      }
    });
    const dataSql = [create.join(""), insert.join("")];
    const query = dataSql.join("");
    fs.writeFile("data.sql", query, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Data conversion completed!");
    });
    importData(query);

    /*
    fs.readdir(sourceFolder, ((err, files) => {
      files.map(fileName => {
        if (fileName.toUpperCase().includes('CSV')) {
          fs.unlink(path.join(sourceFolder, '/', fileName), err => {
            if (err) throw err
          })
        }
      })
    }))
    */
    console.timeEnd(PROCESS_NAME);
  });
};

exports.import = (req, res) => {
  readDBFFiles();
  res.json({ message: "Ok" });
};
