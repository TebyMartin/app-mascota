import express from 'express'
import ModelMascota from '../model/Mascota.js'
import passport from 'passport';
import mongoose from 'mongoose';
import ModelCliente from '../model/Cliente.js';


const MascostaRouter = express()

MascostaRouter.post('/mascota', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const nuevaMascota = await ModelMascota.create({
            ...req.body,
            usuario: req.user.id  
        });

        res.status(201).send(nuevaMascota);
    } catch (error) {
       res.status(400).send(error);
    }
});

MascostaRouter.get('/mascota', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const mascotas = await ModelMascota.find({ usuario: req.user.id }).populate("cliente");
        res.status(200).send(mascotas);
    } catch (error) {
       res.status(500).send({ mensaje: 'Error al obtener las mascotas', error });
    }
});


MascostaRouter.get('/mascota/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const mascota = await ModelMascota.findOne({ 
            _id: req.params.id, 
            usuario: req.user.id  
        }).populate("cliente"); 

        if (!mascota) {
            return res.status(404).send({ mensaje: "Mascota no encontrada" });
        }

        res.status(200).send(mascota);
    } catch (error) {
       res.status(500).send({ mensaje: 'Error al obtener la mascota', error });
    }
})

MascostaRouter.put('/mascota/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
        }

        const objectId = new mongoose.Types.ObjectId(id)

        const mascotaActualizada = await ModelMascota.findOneAndUpdate(
            { _id: objectId }, 
            req.body,
            { new: true, runValidators: true }
        );

        if (!mascotaActualizada) {
            return res.status(404).json({ mensaje: "Mascota no encontrado" });
        }

        res.status(200).json({ mensaje: "Mascota actualizado", mascota: mascotaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el mascota", error: error.message });
    }
});

MascostaRouter.delete("/mascota/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const mascotaEliminada = await ModelMascota.findOneAndDelete({ 
            _id: req.params.id, 
            usuario: req.user.id 
        });

        if (!mascotaEliminada) {
            return res.status(404).send({ mensaje: "Mascota no encontrada o no tienes permiso para eliminarla" });
        }

        res.status(200).send({ mensaje: "Mascota eliminada" });
    } catch (error) {
        res.status(400).send({ mensaje: "Error al eliminar", error });
    }
})
import mongoose from 'mongoose';
import ModelMascota from './models/mascota';  // Asegúrate de importar correctamente tu modelo
import ModelCliente from './models/cliente';  // Asegúrate de importar el modelo de cliente

MascostaRouter.get('/mascota/busqueda', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { cliente } = req.query;
    
    try {
        if (!cliente) {
            return res.status(400).json({ mensaje: 'El parámetro cliente es requerido' });
        }
        let clienteId = cliente;
        if (!mongoose.Types.ObjectId.isValid(cliente)) {
            
            const clienteEncontrado = await ModelCliente.findOne({ nombre: cliente });
            if (!clienteEncontrado) {
                return res.status(404).json({ mensaje: 'Cliente no encontrado' });
            }
            clienteId = clienteEncontrado._id;
        }
        const mascotas = await ModelMascota.find({ cliente: clienteId }).populate('cliente');

        if (!mascotas.length) {
            return res.status(404).json({ mensaje: 'No se encontraron mascotas asociadas al cliente especificado' });
        }

        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo obtener las mascotas', error: error.message });
    }
});




export default MascostaRouter 