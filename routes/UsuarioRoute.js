

import express from 'express'
import ModelUsuario from '../model/Usuario.js'
import generarJWT from "../helpers/generarJWT.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';



const UsuarioRouter = express.Router()


UsuarioRouter.post('/registro', async (req, res) => {
  const { email, username, password } = req.body;
  
  if (!username) {
      return res.status(400).json({ msg: 'El username es obligatorio' });
  }
  
  const existeUsuario = await ModelUsuario.findOne({ email });
  if (existeUsuario) {
      return res.status(400).json({ msg: 'Usuario ya registrado' });
  }

  try {
      const usuario = new ModelUsuario(req.body);
      // Encriptamos la contraseña
      usuario.password = await bcrypt.hash(password, 10);
      const usuarioguardado = await usuario.save();

     
      const token = generarJWT(usuarioguardado._id);

      res.json({
          usuario: usuarioguardado,
          token,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
  }
});


UsuarioRouter.get('/perfil', passport.authenticate("jwt", { session: false }), async (req, res) => {

  res.json(req.user)
});
// Ruta para login
UsuarioRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await ModelUsuario.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "Username o contraseña inválida" });
    }

    const passwordCompared = await bcrypt.compare(password, user.password);
    if (!passwordCompared) {
      return res.status(400).send({ error: "Username o contraseña inválida" });
    }

    // Crear un nuevo token
    const payload = { username: user.username, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

   
    user.token = token;
    await user.save();

    return res.send({ username: user.username, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error del servidor" });
  }
});


  UsuarioRouter.post('/logout', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const usuario = req.user;
  
      usuario.token = ''; 
      await usuario.save(); 
  
      res.json({ msg: 'Sesión cerrada con éxito' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  });
export default UsuarioRouter