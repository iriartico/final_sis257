const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const empleado = require("../controllers/empleado.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

protectedRouter.post("/", empleado.create);

protectedRouter.get("/", empleado.findAll);

protectedRouter.get("/:empleadoId", empleado.findOne);

protectedRouter.put("/:empleadoId", empleado.update);

protectedRouter.delete("/:empleadoId", empleado.delete);

protectedRouter.delete("/", empleado.deleteAll);

module.exports = router;
