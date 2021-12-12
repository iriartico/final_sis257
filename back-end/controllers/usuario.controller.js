const Usuario = require("../models/usuario.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const usuario = new Usuario({
    usuario: req.body.usuario,
    clave: req.body.clave,
    email: req.body.email,
    rol: req.body.rol,
  });

  Usuario.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Usuario.findById(req.params.usuarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con id ${req.params.usuarioId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al usuario con id ${req.params.usuarioId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findValidate = (req, res) => {
  Usuario.findByUserPass(req.params.usuario, req.params.clave, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario ${req.params.usuario} no encontrado`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al usuario ${req.params.usuario}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Usuario.getAll((err, data) => {
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
  Usuario.updateById(
    req.params.usuarioId,
    new Usuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Usuario no encontrado con id ${req.params.usuarioId} no se actualizo`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir al usuario con id ${req.params.usuarioId} no se actualizo`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Usuario.remove(req.params.usuarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con id ${req.params.usuarioId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al usuario con id ${req.params.usuarioId}`,
        });
      }
    } else res.send({ message: "Usuario Eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir al usuario con id ${req.params.usuarioId}`,
      });
    } else res.send({ message: "Todos los Clientes Eliminados" });
  });
};
