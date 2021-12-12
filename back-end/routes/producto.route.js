const express = require("express");
const router = express.Router();
const producto = require('../controllers/producto.controller');

router.post("/", producto.create);

router.get("/", producto.findAll);

router.get("/:productoId", producto.findOne);

router.put("/:productoId", producto.update);

router.delete("/:productoId", producto.delete);

router.delete("/", producto.deleteAll);



module.exports = router;