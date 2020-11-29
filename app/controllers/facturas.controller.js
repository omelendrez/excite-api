const Facturas = require("../models/facturas.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const ajutest = new Facturas({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Facturas.create(ajutest, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Facturas.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Facturas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
        error: err
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Facturas.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Facturas with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Facturas with id " + req.params.id,
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

  Facturas.updateById(
    req.params.id,
    new Facturas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Facturas with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Facturas with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Facturas.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Facturas with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Facturas with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Facturas was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Facturas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
        error: err
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}