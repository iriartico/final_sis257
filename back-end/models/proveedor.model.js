var sql = require("./db");

class Proveedor {
  constructor(proveedor) {
    this.nombre = proveedor.nombre;
    this.nacionalidad = proveedor.nacionalidad;
    this.direccion = proveedor.direccion;
    this.ciudad = proveedor.ciudad;
    this.telefono = proveedor.telefono;
  }

  static create = (newProveedor, result) => {
    sql.query("INSERT INTO proveedor SET ?", newProveedor, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("From proveedor.model: Proveedor creado", {
        id: res.insertId,
      });
      result(null, { id: res.insertId, ...newProveedor });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM proveedor WHERE id= ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Proveedor encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query(`SELECT * FROM proveedor`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de proveedor");
      result(null, res);
    });
  };

  static updateById = (id, proveedor, result) => {
    sql.query(
      `UPDATE proveedor SET nombre = ?, nacionalidad = ?, direccion = ?, ciudad = ?, telefono = ? WHERE id = ?`, //en los signos ? se reemplaza por el dato del array de abajo
      [proveedor.nombre, proveedor.nacionalidad, proveedor.direccion, proveedor.ciudad, proveedor.telefono, id],
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

        console.log("Proveedor actualizado", { id, ...proveedor });
        result(null, { id, ...proveedor }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM proveedor WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Proveedor eliminado con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM proveedor", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} proveedor fueron eliminados`);
      result(null, res);
    });
  };
}

module.exports = Proveedor;