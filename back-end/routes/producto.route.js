const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const producto = require("../controllers/producto.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

protectedRouter.post("/", producto.create);

protectedRouter.get("/", producto.findAll);

protectedRouter.get("/:productoId", producto.findOne);

protectedRouter.put("/:productoId", producto.update);

protectedRouter.delete("/:productoId", producto.delete);

protectedRouter.delete("/", producto.deleteAll);

module.exports = router;
