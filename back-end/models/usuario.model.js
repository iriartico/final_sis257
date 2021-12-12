var sql = require("./db");
var { SECRET_KEY } = require("../config/config");

class Usuario {
  constructor(usuario) {
    this.usuario = usuario.usuario;
    this.clave = usuario.clave;
    this.email = usuario.email;
    this.rol = usuario.rol;
  }

  static create = (newUsuario, result) => {
    (newUsuario.clave = require("crypto")
      .createHmac("sha256", SECRET_KEY)
      .update(newUsuario.clave)
      .digest("hex")),
      sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        console.log("From usuario.model: Usuario creado", {
          id: res.insertId,
        });
        result(null, { id: res.insertId, ...newUsuario });
      });
  };

  static findById = (id, result) => {
    sql.query(`SELECT * FROM usuario WHERE id= ${id}`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Usuario encontrado", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static findByUserPass = (usuario, clave, result) => {
    sql.query(
      `SELECT * FROM usuario WHERE usuario = '${usuario}' AND clave = '${clave}'`,
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Usuario encontrado", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );
  };

  static getAll = (result) => {
    sql.query(`SELECT * FROM usuario`, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Lista de usuario");
      result(null, res);
    });
  };

  static updateById = (id, usuario, result) => {
    sql.query(
      `UPDATE usuario SET usuario = ?, email = ?, rol = ? WHERE id = ?`,
      [usuario.usuario, usuario.email, usuario.rol, id],
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

        console.log("Usuario actualizado", { id, ...usuario });
        result(null, { id, ...usuario }); //en result (error, datos - respuesta)
      }
    );
  };

  static remove = (id, result) => {
    sql.query("DELETE FROM usuario WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Usuario eliminado con id ", id);
      result(null, res);
    });
  };

  static removeAll = (result) => {
    sql.query("DELETE FROM usuario", (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`${res.affectedRows} usuarios fueron eliminados`);
      result(null, res);
    });
  };
}

module.exports = Usuario;
