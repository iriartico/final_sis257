const ListaReproduccion = require("../models/listasReproduccion.models");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe ser vacio",
    });
  }

  const listaReproduccion = new ListaReproduccion({
    nombre: req.body.nombre,
    id_usuario: req.body.id_usuario,
  });

  ListaReproduccion.create(listaReproduccion, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  ListaReproduccion.findById(req.params.listaReproduccionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //quiere decir que no se encontro al listaReproduccion
        res.status(404).send({
          message: `ListaReproduccion no encontrado con id ${req.params.listaReproduccionId}`,
        });
      } else {
        //error aal requerir a la base de datos o conectar con ella
        res.status(500).send({
          message: `Error al requerir al listaReproduccion con id ${req.params.listaReproduccionId}`,
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  ListaReproduccion.getAll((err, data) => {
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
  ListaReproduccion.updateById(
    req.params.listaReproduccionId,
    new ListaReproduccion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `ListaReproduccion no encontrado con id ${req.params.listaReproduccionId} no se actualizo`,
          });
        } else {
          res.status(500).send({
            message: `Error al requerir al listaReproduccion con id ${req.params.listaReproduccionId} no se actualizo`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  ListaReproduccion.remove(req.params.listaReproduccionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ListaReproduccion no encontrado con id ${req.params.listaReproduccionId}`,
        });
      } else {
        res.status(500).send({
          message: `Error al requerir al listaReproduccion con id ${req.params.listaReproduccionId}`,
        });
      }
    } else res.send({ message: "ListaReproduccion Eliminado" });
  });
};

exports.deleteAll = (req, res) => {
  ListaReproduccion.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error al requerir al listaReproduccion con id ${req.params.listaReproduccionId}`,
      });
    } else res.send({ message: "Todos los Interpretes Eliminados" });
  });
};
