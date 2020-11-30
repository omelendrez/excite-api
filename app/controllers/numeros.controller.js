const Numeros = require("../models/numeros.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Numeros(req.body)

  Numeros.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Numeros.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Numeros.getAll((err, data) => {
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
  Numeros.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Numeros with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Numeros with id " + req.params.id,
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

  Numeros.updateById(
    req.params.id,
    new Numeros(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Numeros with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Numeros with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Numeros.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Numeros with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Numeros with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Numeros was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Numeros.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
        error: err
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}