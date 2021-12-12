var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

var sql = require("./models/db");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// app.use()

// routes
app.use("/", require("./routes/index"));
app.use("/api/usuarios", require("./routes/usuario.route"));
app.use("/api/proveedores", require("./routes/proveedor.route"));
app.use("/api/clientes", require("./routes/cliente.route"));
app.use("/api/productos", require("./routes/producto.route"));
app.use("/api/sucursales", require("./routes/tienda.route"));
app.use("/api/empleados", require("./routes/empleado.route"));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
