const Empleado = require("../models/empleado.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const empleado = new Empleado({
    id_tienda: req.body.id_tienda,
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    apellidoP: req.body.apellidoP,
    apellidoM: req.body.apellidoM,
    ci: req.body.ci,
    direccion: req.body.direccion,
    sueldo: req.body.sueldo,
  });

  Empleado.create(empleado, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Empleado.findById(req.params.empleadoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //quiere decir que no se encontro al empleado
        res.status(404).send({
          message: `Empleado no encontrado con id ${req.params.empleadoId}`,
        });
      } else {
        //error aal requerir a la base de datos o conectar con ella
        res.status(500).send({
          message: `Error al requerir al empleado con id ${req.params.empleadoId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Empleado.getAll((err, data) => {
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
  Empleado.updateById(
    req.params.empleadoId,
    new Empleado(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Empleado no encontrado con id ${req.params.empleadoId} no se actualizo`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir al empleado con id ${req.params.empleadoId} no se actualizo`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Empleado.remove(req.params.empleadoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Empleado no encontrado con id ${req.params.empleadoId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al empleado con id ${req.params.empleadoId}`,
        });
      }
    } else res.send({ message: "Empleado Eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Empleado.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir al empleado con id ${req.params.empleadoId}`,
      });
    } else res.send({ message: "Todos los Interpretes Eliminados" });
  });
};
