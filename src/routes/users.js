const { Router } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlconnection = require('../database');
const config = require('../config');
const { route } = require('./order');

router.get('/allusers',function(req, res){
    mysqlconnection.query('SELECT * FROM usuario', function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, rows });
        }
    });
});

router.get('/allusers/:id',(req, res) => {
    const {id} = req.params;
    console.log(id);
    mysqlconnection.query('SELECT * FROM usuario WHERE id_usuario ='+id, (err, rows, fields) => {
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, rows });
        }
    });
});

router.post('/createuser', (req, res) =>{
    const id_usuario = req.body.id_usuario;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const telefono = req.body.telefono;
    const rol = 'Usuario';

    if(!id_usuario || !nombre || !direccion || !correo || !contrasena || !telefono) {
        res.status(500).send({success: false, error: {message: 'Campos incompletos'}});
        return false;
    }

    mysqlconnection.query("INSERT INTO `usuario`(`id_usuario`, `nombre`, `direccion`, `correo`, `contrasena`, `telefono`, `rol`)" +
    " VALUES (" + id_usuario +", '"+ nombre +"', '"+ direccion +"','"+ correo +"','"+ contrasena +"',"+ telefono + ",'"+ rol +"')", function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, message: 'Usuario creado' });
        }
    })
}) 


router.get('/login',(req, res) =>{
    const id_usuario = req.body.id_usuario;
    const contrasena = req.body.contrasena;
    
    if(!id_usuario || !contrasena) {
        res.status(500).send({success: false, error: {message: 'Campos incompletos'}});
        return false;
    }

    mysqlconnection.query("SELECT * FROM usuario  WHERE id_usuario =" + id_usuario + " AND contrasena ='" + contrasena + "'", function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            if (!rows){
                res.status(500).send({success: false, error: {message: `Usuario o contraseña incorrecta`}});
            
                return false;
            }

            const rol = rows [0].rol;

            const payload = {
                id_usuario, 
                rol
            }

            const token = jwt.sign(payload, config.llave, {
                expiresIn: 1440
               });
               res.json({
                mensaje: 'Autenticación correcta',
                token: token
               });
        }
    })
})

module.exports = router;

