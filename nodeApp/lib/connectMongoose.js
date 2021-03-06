'use strict'

const mongoose = require('mongoose');



mongoose.connection.on('error', err => {
    console.log('Error de conexion a MongoDB', err);
    process.exit(1);
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en BD: ', mongoose.connection.name);
})

module.exports= mongoose.connection;