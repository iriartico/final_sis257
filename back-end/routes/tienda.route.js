const express = require("express");
const router = express.Router();
const tienda = require("../controllers/tienda.controller");

router.post("/", tienda.create);

router.get("/", tienda.findAll);

router.get("/:tiendaId", tienda.findOne);

router.put("/:tiendaId", tienda.update);

router.delete("/:tiendaId", tienda.delete);

router.delete("/", tienda.deleteAll);

module.exports = router;
