const Customer = require("../models/customer.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const customer = new Customer({
    code: req.body.code,
    name: req.body.name,
    active: req.body.active
  })

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
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

  Customer.updateById(
    req.params.id,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.id
        })
      }
    } else res.send({ message: `Customer was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}