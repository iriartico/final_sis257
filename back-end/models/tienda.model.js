var sql = require("./db");

class Tienda {
  constructor(tienda) {
    this.descripcion = tienda.descripcion;
    this.direccion = tienda.direccion;
    this.zona = tienda.zona;
    this.ciudad = tienda.ciudad;
  }

  static create = (newTienda, result) => {
    sql.query("INSERT INTO tienda SET ?", newTienda, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("From tienda.model: Tienda creado", {
        id: res.insertId,
      });
      result(null, { id: res.insertId, ...newTienda });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM tienda WHERE id= ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Tienda encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query(`SELECT * FROM tienda`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de tienda");
      result(null, res);
    });
  };

  static updateById = (id, tienda, result) => {
    sql.query(
      `UPDATE tienda SET descripcion = ?, direccion = ?, zona = ?, ciudad = ? WHERE id = ?`, //en los signos ? se reemplaza por el dato del array de abajo
      [tienda.descripcion, tienda.direccion, tienda.zona, tienda.ciudad, id],
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

        console.log("Tienda actualizado", { id, ...tienda });
        result(null, { id, ...tienda }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM tienda WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Tienda eliminado con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM tienda", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} tiendas fueron eliminados`);
      result(null, res);
    });
  };
}

module.exports = Tienda;