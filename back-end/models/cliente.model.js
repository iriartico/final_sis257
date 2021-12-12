var sql = require("./db");

class Cliente {
  constructor(cliente) {
    this.nombre = cliente.nombre;
    this.apellidoP = cliente.apellidoP;
    this.apellidoM = cliente.apellidoM;
    this.usuario = cliente.usuario;
    this.direccion = cliente.direccion;
    this.email = cliente.email;
    this.celular = cliente.celular;
    // this.fechaNacimiento = cliente.fechaNacimiento;
    this.premium = cliente.premium;
  }

  static create = (newCliente, result) => {
    sql.query("INSERT INTO cliente SET ?", newCliente, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("From cliente.model: Cliente creado", {
        id: res.insertId,
      });
      result(null, { id: res.insertId, ...newCliente });
    });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM cliente WHERE id= ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Cliente encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result) => {
    sql.query(`SELECT * FROM cliente`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de cliente");
      result(null, res);
    });
  };

  static updateById = (id, cliente, result) => {
    sql.query(
      `UPDATE cliente SET nombre = ?, apellidoP = ?, apellidoM = ?, usuario = ?, direccion = ?, email = ?, celular = ? WHERE id = ?`, //en los signos ? se reemplaza por el dato del array de abajo
      [cliente.nombre, cliente.apellidoP, cliente.apellidoM, cliente.usuario, cliente.direccion, cliente.email, cliente.celular, id],
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

        console.log("Cliente actualizado", { id, ...cliente });
        result(null, { id, ...cliente }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM cliente WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Cliente eliminado con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM cliente", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} clientes fueron eliminados`);
      result(null, res);
    });
  };
}

module.exports = Cliente;