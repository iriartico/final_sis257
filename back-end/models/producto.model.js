var sql = require("./db");

class Producto {
  constructor(producto) {
    this.id_proveedor = producto.id_proveedor;
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precioV = producto.precioV;
    this.precioC = producto.precioC;
  }

  static create = (newProducto, result) => {
    sql.query("INSERT INTO producto SET ?", newProducto, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("From producto.model: Producto creado", {
        id: res.insertId,
      });
      result(null, { id: res.insertId, ...newProducto });
    });
  };

  static findById = (id, result) => {
    sql.query(
      `SELECT p.*, pe.nombre as proveedor FROM producto p INNER JOIN proveedor pe 
       ON p.id_proveedor = pe.id WHERE p.id= ${id}`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Producto encontrado", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );
  };

  static getAll = (result) => {
    sql.query(
        `SELECT p.*, pe.nombre as proveedor FROM producto p INNER JOIN proveedor pe 
        ON p.id_proveedor = pe.id`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        console.log("Lista de producto");
        result(null, res);
      }
    );
  };

  static updateById = (id, producto, result) => {
    sql.query(
      `UPDATE producto SET id_proveedor = ?, nombre = ?, descripcion = ?, precioV = ?, precioC = ? WHERE id = ?`, //en los signos ? se reemplaza por el dato del array de abajo
      [producto.id_proveedor, producto.nombre, producto.descripcion, producto.precioV, producto.precioC, id],
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

        console.log("Producto actualizado", { id, ...producto });
        result(null, { id, ...producto }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM producto WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Producto eliminado con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM producto", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} productos fueron eliminados`);
      result(null, res);
    });
  };
}

module.exports = Producto;
