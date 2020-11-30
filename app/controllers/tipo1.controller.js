const Tipo1 = require("../models/tipo1.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Tipo1(req.body)

  Tipo1.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tipo1.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Tipo1.getAll((err, data) => {
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
  Tipo1.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tipo1 with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Tipo1 with id " + req.params.id,
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

  Tipo1.updateById(
    req.params.id,
    new Tipo1(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tipo1 with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Tipo1 with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Tipo1.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tipo1 with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Tipo1 with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Tipo1 was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Tipo1.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
        error: err
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}