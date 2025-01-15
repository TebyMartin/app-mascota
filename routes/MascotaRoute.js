import express from 'express'
import ModelMascota from '../model/Mascota.js'
import passport from 'passport';


const MascostaRouter = express()

MascostaRouter.post('/mascota',passport.authenticate("jwt", { session: false }), async (req, res) => {
    const body = req.body
    try {
        const nuevaMascota= await ModelMascota.create(body)
        res.status(201).send(nuevaMascota)
    } catch (error) {
       res.status(400).send(error) 
    }
})

MascostaRouter.get('/mascota',passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const mascota = await ModelMascota.find()
        res.status(200).send(mascota)
    } catch (error) {
       res.status(500).send({mensaje: 'Error al obtener los mascotas', error}) 
    }
})



  
MascostaRouter.put('/mascota/:id', passport.authenticate("jwt", { session: false }),async(req,res)=> {
    try {
       const mascotaActualizado = await ModelMascota.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true}) 
        if (!mascotaActualizado) {
            return res.status(404).send({mensaje:"mascota no encontrado"})
        }
        res.status(200).send({mensaje:"mascota actualizado"})
    } catch (error) {
        res.status(400).send({mensaje:"error al actualizar",error})
    }
})

MascostaRouter.delete("/mascota/:id",passport.authenticate("jwt", { session: false }), async (req,res) => {
    try {
        const mascotaEliminado = await ModelMascota.findByIdAndDelete(req.params.id)
        if (!mascotaEliminado) {
            return res.status(404).send({mensaje:"mascota no encontrado"})
        }
        res.status(200).send({mensaje:"mascota Eliminado"})
    } catch (error) {
        res.status(400).send({mensaje:"error al eliminar",error})
    }
})

MascostaRouter.get('/mascota/busqueda',passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { cliente } = req.query;
    try {
        if (!cliente) {
            return res.status(400).json({ mensaje: 'El parámetro cliente es requerido' });
        }
        const mascotas = await ModelMascota.find({ cliente }).populate('cliente');
        if (!mascotas.length) {
            return res.status(404).json({ mensaje: 'No se encontraron mascotas asociadas al cliente especificado' });
        }
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo obtener las mascotas', error: error.message });
    }
});



export default MascostaRouter 