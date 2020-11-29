const Cliente = require("../models/cliente.model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  const record = new Cliente({
    CLICOD: req.body.CLICOD,
    CLINOM: req.body.CLINOM,
    CLIDOM: req.body.CLIDOM,
    CLILOC: req.body.CLIDOM,
    CLICUIT: req.body.CLICUIT,
    CLITEL: req.body.CLITEL,
    CLICEL: req.body.CLICEL,
    CLICP: req.body.CLICP,
    CLIFP: req.body.CLIFP,
    CLIINT: req.body.CLIINT,
    IVACOD: req.body.IVACOD,
    CLIFAN: req.body.CLIFAN,
    TRACOD: req.body.TRACOD,
    PROCOD: req.body.PROCOD,
    CLISALFEC: req.body.CLISALFEC,
    CLISALDEB: req.body.CLISALDEB,
    CLISALHAB: req.body.CLISALHAB,
    CLISALIMP: req.body.CLISALIMP,
    LOCCOD: req.body.LOCCOD,
    CLITIPO: req.body.CLITIPO,
  })

  Cliente.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cliente.",
        error: err
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
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
  Cliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Cliente with id " + req.params.id,
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

  Cliente.updateById(
    req.params.id,
    new Cliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cliente with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: "Error updating Cliente with id " + req.params.id,
            error: err
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = (req, res) => {
  Cliente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: "Could not delete Cliente with id " + req.params.id,
          error: err
        })
      }
    } else res.send({ message: `Cliente was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
        error: err
      })
    else res.send({ message: `All Customers were deleted successfully!` })
  })
}