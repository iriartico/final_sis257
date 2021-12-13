const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const tienda = require("../controllers/tienda.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

protectedRouter.post("/", tienda.create);

protectedRouter.get("/", tienda.findAll);

protectedRouter.get("/:tiendaId", tienda.findOne);

protectedRouter.put("/:tiendaId", tienda.update);

protectedRouter.delete("/:tiendaId", tienda.delete);

protectedRouter.delete("/", tienda.deleteAll);

module.exports = router;
