import express from 'express'
import dbconnect from './config/db.js';
import Clienterouter from './routes/ClienteRoute.js';
import MascostaRouter from './routes/MascotaRoute.js';
import UsuarioRouter from './routes/UsuarioRoute.js';
import dotenv from 'dotenv';
import { authConfig } from './middleware/passportConfig.js';
import cors from "cors"


dotenv.config();
const app = express();

const allowedOrigins = ['http://localhost:5173']
const options = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);  
      } else {
        callback(new Error('Not allowed by CORS'));  
      }
    }
  };
  
 
  app.use(cors(options));

 app.use(express.json());


authConfig()
app.use("/api",Clienterouter)
app.use("/api",MascostaRouter)
app.use("/api",UsuarioRouter)

 dbconnect().then(() => {
    console.log('El servidor está corriendo ');
    }).catch(err => {
    console.error('No se pudo iniciar el servidor debido a un error en la base de datos');
    })

   
export default app