const Tienda = require("../models/tienda.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const tienda = new Tienda({
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    zona: req.body.zona,
    ciudad: req.body.ciudad,
  });

  Tienda.create(tienda, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Tienda.findById(req.params.tiendaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //quiere decir que no se encontro al tienda
        res.status(404).send({
          message: `Tienda no encontrada con id ${req.params.tiendaId}`,
        });
      } else {
        //error aal requerir a la base de datos o conectar con ella
        res.status(500).send({
          message: `Error al requerir la tienda con id ${req.params.tiendaId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Tienda.getAll((err, data) => {
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
  Tienda.updateById(req.params.tiendaId, new Tienda(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tienda no encontrada con id ${req.params.tiendaId} no se actualizo`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir la tienda con id ${req.params.tiendaId} no se actualizo`,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Tienda.remove(req.params.tiendaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tienda no encontrada con id ${req.params.tiendaId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir la tienda con id ${req.params.tiendaId}`,
        });
      }
    } else res.send({ message: "Tienda Eliminada" });
  });
};

exports.deleteAll = (req, res) => {
  Tienda.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir la tienda con id ${req.params.tiendaId}`,
      });
    } else res.send({ message: "Todos los Tiendas Eliminadas" });
  });
};
