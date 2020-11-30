const Vendedor = require("../models/vendedor.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Vendedor(req.body)

  Vendedor.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vendedor.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Vendedor.getAll((err, data) => {
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
  Vendedor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vendedor with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Vendedor with id " + req.params.id,
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

  Vendedor.updateById(
    req.params.id,
    new Vendedor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vendedor with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Vendedor with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Vendedor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vendedor with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Vendedor with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Vendedor was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Vendedor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
        error: err
      })
    else res.send({ message: `All Records were deleted successfully!` })
  })
}