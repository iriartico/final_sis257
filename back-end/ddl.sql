
DROP TABLE detalleFactura;
DROP TABLE empleado;
DROP TABLE tienda;
DROP TABLE factura;
DROP TABLE pedido;
DROP TABLE cliente;
DROP TABLE producto;
DROP TABLE proveedor;

CREATE DATABASE 'tiendaBedidas' 
USE 'tiendaBebidas'
CREATE TABLE proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NULL,
    ciudad VARCHAR(100) NULL,
    telefono VARCHAR(100) NULL
);

CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    nombre VARCHAR(100),
    descripcion VARCHAR(100),
    precioV INT NOT NULL,
    precioC INT NOT NULL,
    CONSTRAINT fk_producto_proveedor FOREIGN KEY(id_proveedor) REFERENCES proveedor(id)
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidoP VARCHAR(50) NOT NULL,
    apellidoM VARCHAR(50) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    celular VARCHAR(50) NOT NULL,
    -- fechaNacimiento DATE NULL,
    premium BOOLEAN NOT NULL DEFAULT false 
);

CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_producto INT NOT NULL,
    subTotal INT NOT NULL,
    total INT NOT NULL,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY(id_cliente) REFERENCES cliente(id),
    CONSTRAINT fk_pedido_producto FOREIGN KEY(id_producto) REFERENCES producto(id)
);

CREATE TABLE factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT fk_factura_pedido FOREIGN KEY(id_pedido) REFERENCES pedido(id)
);

CREATE TABLE tienda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR(50) NULL,
    zona VARCHAR(50) NULL,
    ciudad VARCHAR(50) NULL
);

CREATE TABLE empleado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_tienda INT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellidoP VARCHAR(20) NOT NULL,
    apellidoM VARCHAR(20) NOT NULL,
    ci VARCHAR(10) NOT NULL,
    direccion VARCHAR(50) NULL,
    sueldo INT NOT NULL,
    CONSTRAINT fk_empleado_tienda FOREIGN KEY(id_tienda) REFERENCES tienda(id)
);

CREATE TABLE detalleFactura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura INT NOT NULL,
    id_empleado INT NOT NULL,
    cantidad INT NOT NULL,
    importe INT NULL,
    detalle INT NULL,
    CONSTRAINT fk_detalleFactura_factura FOREIGN KEY(id_factura) REFERENCES factura(id),
    CONSTRAINT fk_detalleFactura_empleado FOREIGN KEY(id_empleado) REFERENCES empleado(id)
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    clave VARCHAR(50) NOT NULL,
    email VARCHAR(50) NULL,
    rol VARCHAR(50) NULL,
);