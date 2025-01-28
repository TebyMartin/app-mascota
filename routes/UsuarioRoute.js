

import express from 'express'
import ModelUsuario from '../model/Usuario.js'
import generarJWT from "../helpers/generarJWT.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';



const UsuarioRouter = express.Router()


UsuarioRouter.post('/registro', async (req, res) => {
  const { email, username } = req.body;
  
  if (!username) {
      return res.status(400).json({ msg: 'El username es obligatorio' });
  }
  
  const existeUsuario = await ModelUsuario.findOne({ email });
  if (existeUsuario) {
      return res.status(400).json({ msg: 'Usuario ya registrado' });
  }

  try {
      const usuario = new ModelUsuario(req.body);
  
     
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
        const payload = { username: user.username, email: user.email }; // Incluyendo el email en el payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        return res.send({ username: user.username, email: user.email, token });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error del servidor" });
      }
    }
  );

export default UsuarioRouter