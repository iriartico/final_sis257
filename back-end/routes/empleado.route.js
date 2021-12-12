const express = require("express");
const router = express.Router();
const empleado = require('../controllers/empleado.controller');

router.post("/", empleado.create);

router.get("/", empleado.findAll);

router.get("/:empleadoId", empleado.findOne);

router.put("/:empleadoId", empleado.update);

router.delete("/:empleadoId", empleado.delete);

router.delete("/", empleado.deleteAll);



module.exports = router;