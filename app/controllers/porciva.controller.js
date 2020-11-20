const Porciva = require("../models/porciva.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const porciva = new Porciva({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Porciva.create(porciva, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Porciva."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Porciva.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Porciva.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Porciva with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Porciva with id " + req.params.id
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

  Porciva.updateById(
    req.params.id,
    new Porciva(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Porciva with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Porciva with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Porciva.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Porciva with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Porciva with id " + req.params.id
        })
      }
    } else res.send({ message: `Porciva was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Porciva.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}