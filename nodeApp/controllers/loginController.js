'use strict'

const {Usuario} = require('../models')

class LoginController {
    index(req, res, next){
        res.locals.email = '';
        res.locals.error = '';
        res.render('login')
    }

    async post(req, res, next){
        try {
         
        const { email, password}= req.body;

        // buscar usuario en bd
        const usuario = await Usuario.findOne({email });
        //si no lo encuentro o no coincide contraseña --> error
        if (!usuario || !(await usuario.comparePassword(password))){
            
            res.locals.email = email;
            res.locals.error = res.__('Invalid credentials');
            res.render('login')
            return;
        }
        // apunto en la sesión de este usuario que está logged
        req.session.usuarioLogado = {
            _id: usuario._id,
            rol : usuario.rol
        }
        
        //si lo encuentro --> redirigir a la zona privada   
            res.redirect('/privado');
        } catch (error) {
            next(error);
        }
    }
    logout(req, res, next) {
        req.session.regenerate(err => {
          if (err) {
            next(err);
            return;
          }
          res.redirect('/');
        })
      }
}

module.exports = LoginController;