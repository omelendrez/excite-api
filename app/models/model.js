const sql = require("./db/db");
const { findNumber, updateNumber, getIDField } = require("../helpers");
const numeros = require("./db/numeros.json");
const sqlQueries = require("./db/sql.json");

const Model = function (record) {
  const keys = Object.keys(record);
  keys.map((key) => (this[key] = record[key]));
};

Model.create = (newRecord, result, model) => {
  const numero = numeros.find((numero) => numero.model === model);
  if (numero) {
    findNumber(numero.NUMCOD, (err, data) => {
      const value = data.NUMVAL + 1;
      newRecord[numero.field] = value;
      sql.query(`INSERT INTO ${model} SET ?`, newRecord, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        updateNumber(numero.NUMCOD, value);
        result(null, { ID: res.insertId, ...newRecord });
      });
    });
  } else {
    sql.query(`INSERT INTO ${model} SET ?`, newRecord, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ID: res.insertId, ...newRecord });
    });
  }
};

Model.findById = (id, result, model) => {
  let idField = getIDField(model);
  const sqlQuery = `SELECT * FROM ${model} WHERE ${idField} = ${id}`;

  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Model.getAll = (query, result, model) => {
  let { search } = query;
  let sqlQuery = "";
  let sqlWhere = "";

  const sqlObject = sqlQueries.find((query) => query.model === model);
  if (sqlObject) {
    if (search) {
      if (sqlObject.where) {
        sqlWhere =
          (sqlObject.all.includes("WHERE") ? "AND " : "WHERE ") +
          `${sqlObject.where} LIKE "%${search}%"`;
      }
    }
    sqlQuery = sqlObject.all.split("{search}").join(sqlWhere);
  }
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Model.getAllByParentId = (id, query, result, model) => {
  let sqlQuery = "";

  const sqlObject = sqlQueries.find((query) => query.model === model);
  if (sqlObject) {
    sqlQuery = sqlObject.all
      .split("{search}")
      .join(id == 0 && model !== "tipo-subtipos" ? "" : id);
  }

  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Model.updateById = (id, record, result, model) => {
  // Remote time from dates
  if (record.AJUFEC) {
    record.AJUFEC = record.AJUFEC.split("T")[0];
  }
  if (record.CLISALFEC) {
    record.CLISALFEC = record.CLISALFEC.split("T")[0];
  }
  if (record.CONFEC) {
    record.CONFEC = record.CONFEC.split("T")[0];
  }
  if (record.IVAFEC) {
    record.IVAFEC = record.IVAFEC.split("T")[0];
  }
  let idField = getIDField(model);

  const fields = [];
  const values = [];
  Object.keys(record)
    .filter((field) => field != idField)
    .forEach((field) => {
      fields.push(`${field} = ?`);
      values.push(record[field]);
    });
  values.push(id);
  sql.query(
    `UPDATE ${model} SET ${fields.join(",")} WHERE ${idField} = ?`,
    values,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { ID: id, ...record });
    }
  );
};

Model.updatePrice = (id, record, result, model) => {
  const { PRODPRE } = record;
  let sqlQuery = "";
  const idField = getIDField(model);
  const sqlObject = sqlQueries.find((query) => query.model === model);
  if (sqlObject) {
    sqlQuery = sqlObject["update-price"]
      .split("{TIPCOD}")
      .join(iidField)
      .split("{PRODPRE}")
      .join(PRODPRE);
  }
  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Model.remove = (id, result, model) => {
  const idField = getIDField(model);

  const sqlQuery = `DELETE FROM ${model} WHERE ${idField}=?`;

  sql.query(sqlQuery, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Model.removeAll = (result, model) => {
  sql.query(`DELETE FROM ${model}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Model;
