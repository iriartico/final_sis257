const jwt = require("jsonwebtoken");
const { SECRET_KEY, SECRET_TOKEN } = require("../config/config");
const usuario = require("../models/usuario.model");

exports.generateAccessToken = (req, res) => {
  const clave = require("crypto").createHmac("sha256", SECRET_KEY).update(req.body.clave).digest("hex");
  console.log(req.body.usuario, clave);
  var auth = usuario.findByUserPass(req.body.usuario, clave, (err, data) =>{
    if(err){
      res.status(404).send({
        message: `Error al requerir el usuario ${req.params.usuario}`
      });
    }
    else{
      if (data !== null) {
        const payload = {
          username: req.body.username,
          check: true,
        };
    
        const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: "30m" });
    
        res.send({
          message: "Correct Authentication",
          id: data.id,
          usuario: data.usuario,
          rol: data.rol,
          email: data.email,
          token: token,
        });
      } else {
        res.status(401).send({ message: "User or password incorrect" });
        // res.status(404).send({ message: "User or password incorrect" });
      }
    }
  }); 
  
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token not provided" });
  }
  jwt.verify(token, SECRET_TOKEN, (err, authData) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    req.authData = authData;
    next();
  });
};
