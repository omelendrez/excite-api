const Ajustest = require("../models/ajustest.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const ajutest = new Ajustest({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Ajustest.create(ajutest, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ajustest."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Ajustest.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Ajustest.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ajustest with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Ajustest with id " + req.params.customerId
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

  Ajustest.updateById(
    req.params.customerId,
    new Ajustest(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ajustest with id ${req.params.customerId}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Ajustest with id " + req.params.customerId
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Ajustest.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ajustest with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Ajustest with id " + req.params.customerId
        })
      }
    } else res.send({ message: `Ajustest was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Ajustest.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}