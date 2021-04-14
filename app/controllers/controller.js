const Model = require("../models/model.js");

exports.create = (model) => {
  return (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "No se han recibido datos!",
      });
    }
    const record = new Model(req.body);
    Model.create(
      record,
      (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Ha ocurrido un error interno.",
            error: err,
          });
        else res.send(data);
      },
      model
    );
  };
};

exports.findAll = (model) => {
  return (req, res) => {
    Model.getAll(
      req.query,
      (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Error intentando recuperar los datos.",
            error: err,
          });
        else res.send(data);
      },
      model
    );
  };
};

exports.findAllByParentId = (model) => {
  return (req, res) => {
    Model.getAllByParentId(
      req.params.id,
      req.query,
      (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Error intentando recuperar los datos.",
            error: err,
          });
        else res.send(data);
      },
      model
    );
  };
};

exports.findOne = (model) => {
  return (req, res) => {
    Model.findById(
      req.params.id,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se encontró el registro con id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error buscando el registro con id " + req.params.id,
              error: err,
            });
          }
        } else res.send(data);
      },
      model
    );
  };
};

exports.update = (model) => {
  return (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "No se han recibido datos!",
      });
    }

    Model.updateById(
      req.params.id,
      new Model(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se encontró el registro con id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error al actualizar el registro con id " + req.params.id,
              error: err,
            });
          }
        } else res.send(data);
      },
      model
    );
  };
};

exports.delete = (model) => {
  return (req, res) => {
    Model.remove(
      req.params.id,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se encontró el registro con id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message:
                "No se pudo borrar el registro con id id " + req.params.id,
              error: err,
            });
          }
        } else
          res.send({ message: `Los registros fueron eliminados con éxito!` });
      },
      model
    );
  };
};

exports.deleteAll = (model) => {
  return (req, res) => {
    Model.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all records.",
          error: err,
        });
      else res.send({ message: `All Records were deleted successfully!` });
    }, model);
  };
};
