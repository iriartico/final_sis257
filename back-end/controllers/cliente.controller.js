const Cliente = require("../models/cliente.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const cliente = new Cliente({
    nombre: req.body.nombre,
    apellidoP: req.body.apellidoP,
    apellidoM: req.body.apellidoM,
    usuario: req.body.usuario,
    direccion: req.body.direccion,
    email: req.body.email,
    celular: req.body.celular,
    // fechaNacimiento: req.body.fechaNacimiento,
    telefono: req.body.telefono,
    premium: req.body.premium,
  });

  Cliente.create(cliente, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cliente.findById(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //quiere decir que no se encontro al cliente
        res.status(404).send({
          message: `Cliente no encontrado con id ${req.params.clienteId}`,
        });
      } else {
        //error aal requerir a la base de datos o conectar con ella
        res.status(500).send({
          message: `Error al requerir al cliente con id ${req.params.clienteId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }
  Cliente.updateById(
    req.params.clienteId,
    new Cliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Cliente no encontrado con id ${req.params.clienteId} no se actualizo`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir al cliente con id ${req.params.clienteId} no se actualizo`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Cliente.remove(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cliente no encontrado con id ${req.params.clienteId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al cliente con id ${req.params.clienteId}`,
        });
      }
    } else res.send({ message: "Cliente Eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir al cliente con id ${req.params.clienteId}`,
      });
    } else res.send({ message: "Todos los Clientes Eliminados" });
  });
};
