const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const cliente = require("../controllers/cliente.controller");
// const { authenticateToken } = require("../controllers/jwt.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);



protectedRouter.post("/", cliente.create);

protectedRouter.get("/", cliente.findAll);

protectedRouter.get("/:clienteId", cliente.findOne);

protectedRouter.put("/:clienteId", cliente.update);

protectedRouter.delete("/:clienteId", cliente.delete);

protectedRouter.delete("/", cliente.deleteAll);

module.exports = router;
