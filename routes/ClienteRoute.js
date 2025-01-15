import express from 'express'
import ModelCliente from '../model/Cliente.js'
import passport from 'passport'

const Clienterouter = express()

Clienterouter.post('/cliente', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const body = req.body
    try {
        const nuevoCliente= await ModelCliente.create(body)
        res.status(201).send(nuevoCliente)
    } catch (error) {
       res.status(400).send(error) 
    }
})

Clienterouter.get('/cliente', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const cliente = await ModelCliente.find()
        res.status(200).send(cliente)
    } catch (error) {
       res.status(500).send({mensaje: 'Error al obtener los clientes', error}) 
    }
})

Clienterouter.get('/cliente/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const cliente = await ModelCliente.findById(req.params.id)
        if (!cliente) {
            return res.status(404).send({mensaje:"cliente no encontrado"})
        }
        res.status(200).send(cliente)
    } catch (error) {
       res.status(500).send({mensaje: 'Error al obtener los cliente', error}) 
    }
})

  
Clienterouter.put('/cliente/:id',passport.authenticate("jwt", { session: false }),async(req,res)=> {
    try {
       const clienteActualizado = await ModelCliente.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true}) 
        if (!clienteActualizado) {
            return res.status(404).send({mensaje:"cliente no encontrado"})
        }
        res.status(200).send({mensaje:"cliente actualizado"})
    } catch (error) {
        res.status(400).send({mensaje:"error al actualizar",error})
    }
})

Clienterouter.delete("/cliente/:id", passport.authenticate("jwt", { session: false }), async (req,res) => {
    try {
        const clienteEliminado = await ModelCliente.findByIdAndDelete(req.params.id)
        if (!clienteEliminado) {
            return res.status(404).send({mensaje:"cliente no encontrado"})
        }
        res.status(200).send({mensaje:"cliente Eliminado"})
    } catch (error) {
        res.status(400).send({mensaje:"error al eliminar",error})
    }
})


export default Clienterouter 