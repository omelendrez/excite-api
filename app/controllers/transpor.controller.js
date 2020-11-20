const Transpor = require("../models/transpor.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const transpor = new Transpor({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Transpor.create(transpor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transpor."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Transpor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Transpor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transpor with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Transpor with id " + req.params.id
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

  Transpor.updateById(
    req.params.id,
    new Transpor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Transpor with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Transpor with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Transpor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transpor with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Transpor with id " + req.params.id
        })
      }
    } else res.send({ message: `Transpor was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Transpor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}