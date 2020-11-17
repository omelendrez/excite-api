const Concepto = require("../models/concepto.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const concepto = new Concepto({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Concepto.create(concepto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Concepto."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Concepto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Concepto.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Concepto with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Concepto with id " + req.params.customerId
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

  Concepto.updateById(
    req.params.customerId,
    new Concepto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Concepto with id ${req.params.customerId}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Concepto with id " + req.params.customerId
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Concepto.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Concepto with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Concepto with id " + req.params.customerId
        })
      }
    } else res.send({ message: `Concepto was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Concepto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}