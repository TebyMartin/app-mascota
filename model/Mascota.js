import mongoose from "mongoose"



const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    raza: { type: String },
    edad: { type: Number },
    sintomas: { type: String },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente'
    }
  });

  
  const ModelMascota = mongoose.model("mascota", mascotaSchema)
  export default ModelMascota
