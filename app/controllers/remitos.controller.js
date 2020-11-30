const Remitos = require("../models/remitos.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Remitos(req.body)

  Remitos.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Remitos.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Remitos.getAll((err, data) => {
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
  Remitos.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Remitos with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Remitos with id " + req.params.id,
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

  Remitos.updateById(
    req.params.id,
    new Remitos(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Remitos with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Remitos with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Remitos.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Remitos with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Remitos with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Remitos was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Remitos.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
        error: err
      })
    else res.send({ message: `All Records were deleted successfully!` })
  })
}