import Cookies from "js-cookie";
import http from "./http-common";

export default {
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  deleteUserLogged() {
    return Cookies.remove("userLogged");
  },

  async login(username, password) {
    var userDB = {};
    await http
      .post("usuarios/login", { usuario: username, clave: password })
      .then((response) => {
        userDB = response.data;
        if (username == userDB.usuario) {
          const userCookie = {
            username: userDB.usuario,
            rol: userDB.rol,
            email: userDB.email,
          };
          localStorage.setItem("token", userDB.token);
          Cookies.set("userLogged", JSON.stringify(userCookie), {
            expires: (1 / 1440) * 30,
          }); //minutos para expirar la auteticacion
          return userCookie;
        } else return "";
      });
  },
};
