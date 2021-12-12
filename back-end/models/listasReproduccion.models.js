var sql = require("./db");

class ListaReproduccion {
  constructor(listaReproduccion) {
    this.nombre = listaReproduccion.nombre;
    this.id_usuario = listaReproduccion.id_usuario;
  }

  static create = (newAlbum, result) => {
    sql.query("INSERT INTO listasReproduccion SET ?", newAlbum, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("From listasReproduccion.models: ListaReproduccion creado", {
        id: res.insertId,
      });
      result(null, { id: res.insertId, ...newAlbum });
    });
  };

  static findById = (id, result) => {
    sql.query(
      `SELECT l.*, u.usuario as Usuario FROM listasReproduccion l INNER JOIN usuarios u 
       ON l.id_usuario = u.id WHERE a.id= ${id}`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("ListaReproduccion encontrado", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );
  };

  static getAll = (result) => {
    sql.query(
      `SELECT l.*, u.usuario as usuario FROM listasReproduccion l INNER JOIN usuarios u 
        ON l.id_usuario = u.id`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        console.log("Lista de listasReproduccion");
        result(null, res);
      }
    );
  };

  static updateById = (id, listaReproduccion, result) => {
    sql.query(
      `UPDATE listasReproduccion SET nombre = ?,id_usuario = ? WHERE id = ?`, //en los signos ? se reemplaza por el dato del array de abajo
      [listaReproduccion.nombre, listaReproduccion.id_usuario, id],
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("ListaReproduccion actualizado", {
          id,
          ...listaReproduccion,
        });
        result(null, { id, ...listaReproduccion }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM listasReproduccion WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Lista de Reproduccion eliminada con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM listasReproduccion", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} listas de Reproduccion fueron eliminadas`);
      result(null, res);
    });
  };
}

module.exports = ListaReproduccion;
