const Pagos = require("../models/pagos.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const ajutest = new Pagos({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Pagos.create(ajutest, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pagos."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Pagos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Pagos.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pagos with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Pagos with id " + req.params.id
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

  Pagos.updateById(
    req.params.id,
    new Pagos(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pagos with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Pagos with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Pagos.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pagos with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Pagos with id " + req.params.id
        })
      }
    } else res.send({ message: `Pagos was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Pagos.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}