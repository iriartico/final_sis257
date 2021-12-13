const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const proveedor = require("../controllers/proveedor.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

protectedRouter.post("/", proveedor.create);

protectedRouter.get("/", proveedor.findAll);

protectedRouter.get("/:proveedorId", proveedor.findOne);

protectedRouter.put("/:proveedorId", proveedor.update);

protectedRouter.delete("/:proveedorId", proveedor.delete);

protectedRouter.delete("/", proveedor.deleteAll);

module.exports = router;
