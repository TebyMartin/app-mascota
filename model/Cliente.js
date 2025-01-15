import mongoose from "mongoose"



const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
  });

  
  const ModelCliente = mongoose.model("cliente", clienteSchema)
  export default ModelCliente
