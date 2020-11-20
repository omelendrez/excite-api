const Tipo = require("../models/tipo.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const tipo = new Tipo({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Tipo.create(tipo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tipo."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Tipo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Tipo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tipo with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Tipo with id " + req.params.id
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

  Tipo.updateById(
    req.params.id,
    new Tipo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tipo with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Tipo with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Tipo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tipo with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Tipo with id " + req.params.id
        })
      }
    } else res.send({ message: `Tipo was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Tipo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}