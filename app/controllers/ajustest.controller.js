const Ajustest = require("../models/ajustest.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Ajustest({
    AJUNUM: req.body.AJUNUM,
    AJUFEC: req.body.AJUFEC,
    PRODCOD: req.body.PRODCOD,
    AJUCAN: req.body.AJUCAN
  })

  Ajustest.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ajustest.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Ajustest.getAll((err, data) => {
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
  Ajustest.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ajustest with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Ajustest with id " + req.params.id,
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

  Ajustest.updateById(
    req.params.id,
    new Ajustest(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ajustest with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Ajustest with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Ajustest.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ajustest with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Ajustest with id " + req.params.id,
          error: err
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
          err.message || "Some error occurred while removing all customers.",
        error: err
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}