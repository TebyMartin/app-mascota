import express from 'express'
import dbconnect from './config/db.js';
import Clienterouter from './routes/ClienteRoute.js';
import MascostaRouter from './routes/MascotaRoute.js';
import UsuarioRouter from './routes/UsuarioRoute.js';
import dotenv from 'dotenv';
import { authConfig } from './middleware/passportConfig.js';

const app = express();
dotenv.config();
 app.use(express.json());
 // Ruta de prueba
 app.get('/', (req, res) => {
 res.send('El servidor está funcionando correctamente');
 });
authConfig()
app.use(Clienterouter)
app.use(MascostaRouter)
app.use(UsuarioRouter)

 dbconnect().then(() => {
    app.listen(3000, () => {
    console.log('El servidor está corriendo en el puerto 3000');
    });
    }).catch(err => {
    console.error('No se pudo iniciar el servidor debido a un error en la base de datos');
    })

   
   