'use strict'

const dotenv = require('dotenv')
dotenv.config()

const dbConnection = require('./lib/connectMongoose');
const anuncioData = require('./initDB.anuncios.json')

const Usuario = require('./models/Usuario.js');

const Anuncio = require('./models/Anuncio.js');


async function main() {

    await initAnuncios();

    await initUsuarios();

    dbConnection.close();


}

main().catch(err => console.log('Hubo un error', err));

async function initUsuarios() {
//borrar usuarios existentes
const deleted = await Usuario.deleteMany();

console.log(`Eliminados ${deleted.deletedCount} usuarios.`);
const usuarios = await Usuario.insertMany([
    {
        email: 'admin@example.com',
        password: await Usuario.hashPassword('1234'),
        rol: 'admin'
    },
    {
        email: 'user1@example.com',
        password: await Usuario.hashPassword('1234'),
        rol: 'user'
    }]);
    

    console.log(`Creados ${usuarios.length} usuarios`);
};

async function initAnuncios() {
    const deleted = await Anuncio.deleteMany();


    console.log(`Eliminados ${deleted.deletedCount} anuncios.`);
    console.log(anuncioData);
    const anuncios = await Anuncio.insertMany(anuncioData)
    console.log(`Creados ${ anuncios.length } anuncios.`);
}