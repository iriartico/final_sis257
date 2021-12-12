const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/config");

exports.generateAccessToken = (req, res) => {
  if (req.body.usuario == "iriartex" && req.body.clave == "HelloPeter123") {
    const payload = {
      username: req.body.username,
      check: true,
    };

    const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: "3600s" });

    res.send({
      message: "Correct Authentication",
      token: token,
    });
  } else {
    res.status(401).send({ message: "User or password incorrect" });
  }
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
