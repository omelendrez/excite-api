const Estados = require("../models/estados.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const estados = new Estados({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Estados.create(estados, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Estados."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Estados.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Estados.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Estados with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Estados with id " + req.params.id
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

  Estados.updateById(
    req.params.id,
    new Estados(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Estados with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Estados with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Estados.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Estados with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Estados with id " + req.params.id
        })
      }
    } else res.send({ message: `Estados was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Estados.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}