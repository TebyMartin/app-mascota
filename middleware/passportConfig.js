import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import ModelUsuario from "../model/Usuario.js"; // Asegúrate de tener el modelo de usuario de Mongoose importado

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // Asegúrate de que la variable JWT_SECRET esté configurada correctamente
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      try {
        // Buscar al usuario en la base de datos MongoDB
        const user = await ModelUsuario.findOne({ username: payload.username });

        if (user) {
          // Si se encuentra el usuario, se pasa el usuario a la siguiente función
          next(null, user); // Pasamos el documento completo del usuario
        } else {
          // Si no se encuentra el usuario, devolver 'false'
          next(null, false);
        }
      } catch (error) {
        console.error("Error al buscar usuario en la base de datos:", error);
        next(error, false);
      }
    })
  );
}
