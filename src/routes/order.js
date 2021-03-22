const express = require('express');
const router = express.Router();

const mysqlconnection = require('../database');
const authenticateJWT = require('../jwt');

router.post('/create-order',authenticateJWT,function(req, res){
    let payment = req.body.forma_de_pago;
    let address = req.body.direccion;
    let products = req.body.productos;
    let productsDetails = [];
    const state = 'Creado';

    const { id_usuario } = req.user;

    if (payment != 'debito' && payment != 'credito' && payment != 'efectivo'){
        res.status(500).send({success: false, error: {message: 'Forma de pago inválida'}});
        return false;
    };

    if (!address){
        res.status(500).send({success: false, error: {message: 'Dirección no válida'}});
        return false;
    }

    if (!products) {
        res.status(500).send({success: false, error: {message: 'No existe el producto'}});
        return false;
    }

    
    for(let i = 0; i < products.length; i++) {
        let obj = products[i];

        if (!obj.cantidad || obj.cantidad <= 0) {
            res.status(500).send({success: false, error: {message: `Existe producto con cantidad no especificada o inválida`}});
            return false;        
        }

        if(!obj.id_producto){
            res.status(500).send({success: false, error: {message: `Producto con id no encontrado`}});
            return false;
        }
    
        mysqlconnection.query(`SELECT * FROM producto WHERE id_producto=${obj.id_producto}`, function(err, rows, fields){
            if(err){
                res.status(500).send({success: false, error: {message: err}});
                return false;
            } else {
                if (!rows){
                    res.status(500).send({success: false, error: {message: `Producto con id ${obj.id} no encontrado`}});
                
                    return false;
                }

                rows[0].cantidad = obj.cantidad;


                productsDetails.push(rows[0]);

                let total = 0 ;
                let description = '';
            
                for(let i = 0; i < productsDetails.length; i++){
                    let currentProduct = productsDetails[i];
                    let subtotal = currentProduct.precio * currentProduct.cantidad;
                    total = total + subtotal;
                    description = description + currentProduct.nombre + ',';
                }
            
                description = description.slice(0, -1);
            
                let sql = '';
            
                sql=`INSERT INTO pedido (fecha, id_usuario, forma_de_pago, estado, total, direccion, descripcion) VALUES ('${new Date()}', ${id_usuario}, '${payment}' , '${state}', ${total}, '${address}', '${description}')`;
            
                mysqlconnection.query(sql, function(err, rows, fields){
                    if(err){
                        res.status(500).send({success: false, error: {message: err}});
                        return false;
                    } else {
                        const id_pedido = rows.insertId;
            
                        for(let i = 0; i < productsDetails.length; i++){
                            let currentProduct = productsDetails[i];
                            let sql2 = "INSERT INTO pedido_por_producto(id_producto, id_pedido, cantidad) VALUES (" + currentProduct.id_producto +", " + id_pedido + "," + currentProduct.cantidad +")";

                            mysqlconnection.query(sql2, function(err, rows, fields){
                                if(err){
                                    res.status(500).send({success: false, error: {message: err}});
                                    return false;
                                }else{
                                    if(i == (productsDetails.length - 1)) {
                                        return res.status(200).send({success: true, message: 'Pedido creado' });
                                    }
                                }    
                            })
                        }
                    }
                });  
            }
        })
    }

   
});



router.put('/editorder/:idorder/:state', authenticateJWT,function(req, res){

    const { rol } = req.user;

    if (rol !== 'Administrador') {
        return res.status(403).send({success: false, error: {message: 'Usuario no autorizado'}});
    }

    const idOrder = req.params.idorder;
    const state = req.params.state;

    if (!idOrder){
        res.status(500).send({success: false, error: {message: 'No se encuentra el pedido'}});
        return false;
    }
    
    if(state != 'Creado' && state != 'Preparando' && state != 'Cancelado' && state != 'Entregado'){
        res.status(500).send({success: false, error: {message: 'Estado no válido'}});
        return false;
    }

     
        mysqlconnection.query(`UPDATE pedido SET estado = '${state}' WHERE id_pedido=${idOrder}`, function(err, rows, fields){
            if(err){
                res.status(500).send({success: false, error: {message: err}});
            } else {
                res.status(200).send({success: true, message: 'Pedido actualizado' });
            }
        })
        
});

router.delete('/deleteorder/:idorder', authenticateJWT,function(req, res){

    const { rol } = req.user;

    if (rol !== 'Administrador') {
        return res.status(403).send({success: false, error: {message: 'Usuario no autorizado'}});
    }

    const idOrder = req.params.idorder;

    if(!idOrder || idOrder <= 0){
        res.status(500).send({success: false, error: {message: 'Parámetro incorrecto'}});
    } else {
        mysqlconnection.query("DELETE FROM pedido WHERE id_pedido=" + idOrder, function(err, rows, fields){
            if(err){
                res.status(500).send({success: false, error: {message: err}});
            } else {
                res.status(200).send({success: true, message: 'Pedido eliminado correctamente' });
            }
        })
    }    
});

router.get('/selectorders', authenticateJWT,function(req, res){

    const { rol } = req.user;

    if (rol !== 'Administrador') {
        return res.status(403).send({success: false, error: {message: 'Usuario no autorizado'}});
    }

    
    mysqlconnection.query('SELECT * FROM pedido', function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, rows });
        }
    })
});

router.get('/selectidOrder/:idorder', authenticateJWT,function(req, res){

    const idOrder = req.params.idorder;
    let queryOrder = 'SELECT * FROM pedido WHERE id_pedido=' + idOrder;

    const {id_usuario, rol} = req.user;

    if (rol !== 'Administrador') {
        queryOrder += " AND id_usuario = "+ id_usuario;
    }
    
    if(!id_usuario || !rol){
        res.status(500).send({success: false, error: {message: 'No ha sido posible generar información'}});
        return false;
    }

    if (!idOrder){
        res.status(500).send({success: false, error: {message: 'No se encuentra el pedido'}});
        return false;
    }

    mysqlconnection.query(queryOrder, function(err, rows, fields){
        if(err){
            res.status(500).send({success: false, error: {message: err}});
        } else {
            res.status(200).send({success: true, rows });
        }
    })
});



module.exports = router;