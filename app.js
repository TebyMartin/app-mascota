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
app.use(cors())

 app.use(express.json());
 // Ruta de prueba

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