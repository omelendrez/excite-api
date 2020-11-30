const Iva = require("../models/iva.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Iva(req.body)

  Iva.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Iva.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Iva.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving records.",
        error: err
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Iva.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Iva with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Iva with id " + req.params.id,
          error: err
        })
      }
    } else res.send(data)
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  Iva.updateById(
    req.params.id,
    new Iva(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Iva with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Iva with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Iva.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Iva with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Iva with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Iva was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Iva.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
        error: err
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}