-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2021 a las 03:34:43
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `forma_de_pago` varchar(20) NOT NULL,
  `estado` varchar(12) NOT NULL,
  `total` int(11) NOT NULL,
  `direccion` varchar(20) NOT NULL,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `fecha`, `id_usuario`, `forma_de_pago`, `estado`, `total`, `direccion`, `descripcion`) VALUES
(4, 'Sat Feb 06 2021 18:22:14 GMT-0500 (GMT-05:00)', 2305578, 'debito', 'Creado', 960, 'calle 123 no. 52 - 1', 'Bagel de salmón edit');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_por_producto`
--

CREATE TABLE `pedido_por_producto` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_por_producto`
--

INSERT INTO `pedido_por_producto` (`id`, `id_producto`, `id_pedido`, `cantidad`) VALUES
(2, 1, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `precio`) VALUES
(1, 'Bagel de salmón edit', 480),
(2, 'Hamburguesa clásica', 350),
(3, 'Focaccia', 300),
(4, 'Sandwich Focaccia', 440),
(5, 'Pasta aflredo', 505);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `direccion` varchar(70) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `contrasena` varchar(8) NOT NULL,
  `telefono` int(15) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `direccion`, `correo`, `contrasena`, `telefono`, `rol`) VALUES
(12581, 'Isabella perez', 'calle 55 No. 32 - 58 Poblado (medellin)', 'isablue9@hotmail.com', 'pucca123', 300111257, 'Usuario'),
(111035, 'Juan Camargo', 'diagonal 15 B No. 67 - 42 Medellin', 'jcamargo6@gmail.com', '012345', 1112482730, 'Usuario'),
(2305578, 'Dixon Guerrero', 'Transversal 58 No. 103 - 29 llano grande', 'dixguer@hotmail.com', 'gol123', 331538122, 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `usuario_pedido` (`id_usuario`);

--
-- Indices de la tabla `pedido_por_producto`
--
ALTER TABLE `pedido_por_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_foranea` (`id_pedido`),
  ADD KEY `producto_foranea` (`id_producto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedido_por_producto`
--
ALTER TABLE `pedido_por_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `usuario_pedido` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido_por_producto`
--
ALTER TABLE `pedido_por_producto`
  ADD CONSTRAINT `pedido_foranea` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_foranea` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
