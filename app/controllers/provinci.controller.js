const Provinci = require("../models/provinci.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const provinci = new Provinci({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Provinci.create(provinci, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provinci."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Provinci.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Provinci.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Provinci with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Provinci with id " + req.params.id
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

  Provinci.updateById(
    req.params.id,
    new Provinci(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Provinci with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Provinci with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Provinci.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Provinci with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Provinci with id " + req.params.id
        })
      }
    } else res.send({ message: `Provinci was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Provinci.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}