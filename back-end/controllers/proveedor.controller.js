const Proveedor = require("../models/proveedor.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const proveedor = new Proveedor({
    nombre: req.body.nombre,
    nacionalidad: req.body.nacionalidad,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    telefono: req.body.telefono,
  });

  Proveedor.create(proveedor, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Proveedor.findById(req.params.proveedorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //quiere decir que no se encontro al proveedor
        res.status(404).send({
          message: `Proveedor no encontrado con id ${req.params.proveedorId}`,
        });
      } else {
        //error aal requerir a la base de datos o conectar con ella
        res.status(500).send({
          message: `Error al requerir al proveedor con id ${req.params.proveedorId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Proveedor.getAll((err, data) => {
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
  Proveedor.updateById(
    req.params.proveedorId,
    new Proveedor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Proveedor no encontrado con id ${req.params.proveedorId} no se actualizo`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir al proveedor con id ${req.params.proveedorId} no se actualizo`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Proveedor.remove(req.params.proveedorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Proveedor no encontrado con id ${req.params.proveedorId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al proveedor con id ${req.params.proveedorId}`,
        });
      }
    } else res.send({ message: "Proveedor Eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Proveedor.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir al proveedor con id ${req.params.proveedorId}`,
      });
    } else res.send({ message: "Todos los Interpretes Eliminados" });
  });
};
