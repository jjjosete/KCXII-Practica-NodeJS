'use strict'

const express = require("express");
const router = express.Router();
const tagString = "Lifestyle,  Mobile, Work, Mobile";

//GET /api/agentes

//Devuelve una lista de tags
router.get('/', async (req, res, next) => {
    try{

      

        res.render('tags', { tags: tagString});
    } catch(err){
        next(err)
    }
})

module.exports = router