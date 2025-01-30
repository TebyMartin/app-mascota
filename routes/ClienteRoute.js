import express from 'express';
import ModelCliente from '../model/Cliente.js';
import passport from 'passport';

const ClienteRouter = express();

ClienteRouter.post('/cliente', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const nuevoCliente = await ModelCliente.create({
            ...req.body,
            usuario: req.user.id  
        });

        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el cliente', error: error.message });
    }
});


ClienteRouter.get('/cliente', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const clientes = await ModelCliente.find({ usuario: req.user.id });  
        res.status(200).json(clientes);
    } catch (error) {
       res.status(500).json({ mensaje: 'Error al obtener los clientes', error: error.message });
    }
});


ClienteRouter.get('/cliente/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const cliente = await ModelCliente.findOne({ _id: req.params.id, usuario: req.user.id });
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        res.status(200).json(cliente);
    } catch (error) {
       res.status(500).json({ mensaje: 'Error al obtener el cliente', error: error.message });
    }
});


ClienteRouter.put('/cliente/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const clienteActualizado = await ModelCliente.findOneAndUpdate(
            { _id: req.params.id, usuario: req.user.id }, 
            req.body, 
            { new: true, runValidators: true }
        ); 

        if (!clienteActualizado) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        res.status(200).json({ mensaje: "Cliente actualizado", cliente: clienteActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar el cliente", error: error.message });
    }
});


ClienteRouter.delete("/cliente/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const clienteEliminado = await ModelCliente.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
        if (!clienteEliminado) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        res.status(200).json({ mensaje: "Cliente eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar el cliente", error: error.message });
    }
});

export default ClienteRouter;
