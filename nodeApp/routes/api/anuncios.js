'use strict'

const express = require("express");
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

//GET /api/agentes


router.get('/', async (req, res, next) => {
    
    try {
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const skip = req.query.skip;
        const limit = req.query.limit;
        const select = req.query.select;
        const precio = req.query.precio;
        const precioMax = req.query.precioMax;
        const precioMin = req.query.precioMin;
        const sort = req.query.sort;
        const tags = req.query.tags;

        const filtros = {};

        if (nombre){
            filtros.nombre = nombre;
        }
        
         if (venta){
             filtros.venta = venta;
         }
        
         if (tags){
             filtros.tags = tags;
         }
        
         if (precio){
             filtros.precio = precio;
         }
         if (precioMin){
             filtros.precio ={$gte: precioMin};
         }
         if (precioMax){
             filtros.precio ={$lte: precioMax};
         }
         if (precioMax && precioMin){
             filtros.precio ={ $gte: precioMin ,$lte: precioMax};
        
         }

    const anuncios = await Anuncio.lista(filtros, skip, limit, select, sort);
   
    res.render('anuncios', { 
        results: anuncios,
        title: 'NodePop',
        welcome: 'Bienvenido a NodePop'
    
                            });
    
    } catch (err){
        next(err)
    }
})
// Método POST a api/anuncio => CREA UN NUEVO ANUNCIO

router.post('/', async (req, res, next) =>{
    try {
        const anuncioData = req.body;

        const anuncio = new Anuncio(anuncioData);

        const anuncioGuardado = await anuncio.save()
        res.status(201).json({ result: anuncioGuardado})
    } catch (err) {
        next(err);
    }
})

    
module.exports = router;