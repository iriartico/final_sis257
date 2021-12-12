var sql = require("./db");

class Empleado {
  constructor(empleado) {
    this.id_tienda = empleado.id_tienda;
    this.usuario = empleado.usuario;
    this.nombre = empleado.nombre;
    this.apellidoP = empleado.apellidoP;
    this.apellidoM = empleado.apellidoM;
    this.ci = empleado.ci;
    this.direccion = empleado.direccion;
    this.sueldo = empleado.sueldo;
  }

  static create = (newProducto, result) => {
    sql.query("INSERT INTO empleado SET ?", newProducto, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("From empleado.model: Empleado creado", {
        id: res.insertId,
      });
      result(null, { id: res.insertId, ...newProducto });
    });
  };

  static findById = (id, result) => {
    sql.query(
      `SELECT e.*, t.descripcion as sucursal FROM empleado e INNER JOIN tienda t 
       ON e.id_tienda = t.id WHERE e.id= ${id}`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Empleado encontrado", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );
  };

  static getAll = (result) => {
    sql.query(
      `SELECT e.*, t.descripcion as sucursal FROM empleado e INNER JOIN tienda t 
      ON e.id_tienda = t.id`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        console.log("Lista de empleado");
        result(null, res);
      }
    );
  };

  static updateById = (id, empleado, result) => {
    sql.query(
      `UPDATE empleado SET id_tienda = ?, usuario = ?, nombre = ?, apellidoP = ?, apellidoM = ?, ci = ?, direccion = ?, sueldo = ? WHERE id = ?`,
      [
        empleado.id_tienda,
        empleado.usuario,
        empleado.nombre,
        empleado.apellidoP,
        empleado.apellidoM,
        empleado.ci,
        empleado.direccion,
        empleado.sueldo,
        id,
      ],
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

        console.log("Empleado actualizado", { id, ...empleado });
        result(null, { id, ...empleado }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM empleado WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Empleado eliminado con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM empleado", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} empleados fueron eliminados`);
      result(null, res);
    });
  };
}

module.exports = Empleado;
