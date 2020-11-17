const Producto = require("../models/producto.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const producto = new Producto({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Producto.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Producto."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Producto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Producto.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Producto with id " + req.params.customerId
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

  Producto.updateById(
    req.params.customerId,
    new Producto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Producto with id ${req.params.customerId}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Producto with id " + req.params.customerId
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Producto.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.customerId}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Producto with id " + req.params.customerId
        })
      }
    } else res.send({ message: `Producto was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}