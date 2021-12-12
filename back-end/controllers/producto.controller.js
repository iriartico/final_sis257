const Producto = require("../models/producto.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const producto = new Producto({
    id_proveedor: req.body.id_proveedor,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precioV: req.body.precioV,
    precioC: req.body.precioC,
  });

  Producto.create(producto, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Producto.findById(req.params.productoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //quiere decir que no se encontro al producto
        res.status(404).send({
          message: `Producto no encontrado con id ${req.params.productoId}`,
        });
      } else {
        //error aal requerir a la base de datos o conectar con ella
        res.status(500).send({
          message: `Error al requerir al producto con id ${req.params.productoId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Producto.getAll((err, data) => {
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
  Producto.updateById(
    req.params.productoId,
    new Producto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Producto no encontrado con id ${req.params.productoId} no se actualizo`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir al producto con id ${req.params.productoId} no se actualizo`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Producto.remove(req.params.productoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Producto no encontrado con id ${req.params.productoId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al producto con id ${req.params.productoId}`,
        });
      }
    } else res.send({ message: "Producto Eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir al producto con id ${req.params.productoId}`,
      });
    } else res.send({ message: "Todos los Interpretes Eliminados" });
  });
};
