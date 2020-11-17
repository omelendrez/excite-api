const Numeros = require("../models/numeros.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const numeros = new Numeros({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Numeros.create(numeros, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Numeros."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Numeros.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Numeros.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Numeros with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Numeros with id " + req.params.customerId
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
    req.params.customerId,
    new Numeros(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Numeros with id ${req.params.customerId}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Numeros with id " + req.params.customerId
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Numeros.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Numeros with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Numeros with id " + req.params.customerId
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
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}