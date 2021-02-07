const express = require('express');
const router = express.Router();

const mysqlconnection = require('../database');
const authenticateJWT = require('../jwt');

router.get('/allproducts',function(req, res){
    mysqlconnection.query('SELECT * FROM producto', function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, rows });
        }
    })
});

router.post('/editproduct/:idproduct', authenticateJWT,function(req, res){

    const { rol } = req.user;

    if (rol !== 'Administrador') {
        return res.status(403).send({success: false, error: {message: 'Usuario no autorizado'}});
    }

    const idProduct = req.params.idproduct;

    if(!idProduct || idProduct <= 0){
        res.status(500).send({success: false, error: {message: 'Parámetro incorrecto'}});
    } else {
        let query = "";
        const name = req.body.name;
        const price = req.body.price;

        if (!name && !price ){
            res.status(500).send({success: false, error: {message: 'Parámetros inválidos'}});
            return false;
        }

        query +="UPDATE producto SET ";

        query += name ? "nombre = '" + name + "'" : '';

        query += price ? "," : '';
        query += price ? " precio = " + price : '';

        mysqlconnection.query(`${query} WHERE id_producto=${idProduct}`, function(err, rows, fields){
            if(err){
                res.status(500).send({success: false, error: {message: err}});
            } else {
                res.status(200).send({success: true, message: 'Producto actualizado correctamente' });
            }
        })
    }    
});

router.post('/addproduct', authenticateJWT,function(req, res){

    const { rol } = req.user;

    if (rol !== 'Administrador') {
        return res.status(403).send({success: false, error: {message: 'Usuario no autorizado'}});
    }

    const name = req.body.name || '';
    const price = req.body.price || 0;
    mysqlconnection.query("INSERT INTO producto (nombre, precio) values ('" + name + "', " + price + ")", function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, message: 'Producto insertado correctamente' });
        }
    })

});

router.post('/deleteproduct/:idproduct', authenticateJWT,function(req, res){

    const { rol } = req.user;

    if (rol !== 'Administrador') {
        return res.status(403).send({success: false, error: {message: 'Usuario no autorizado'}});
    }

    const idProduct = req.params.idproduct;

    if(!idProduct || idProduct <= 0){
        res.status(500).send({success: false, error: {message: 'Parámetro incorrecto'}});
    } else {
        mysqlconnection.query("DELETE FROM producto WHERE id_producto=" + idProduct, function(err, rows, fields){
            if(err){
                res.status(500).send({success: false, error: {message: err}});
            } else {
                res.status(200).send({success: true, message: 'Producto eliminado correctamente' });
            }
        })
    }    
});

module.exports = router;