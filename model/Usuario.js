import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    token: { type: String }
}, { timestamps: true })

usuarioSchema.pre('save',async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password )
}

const ModelUsuario = mongoose.model('usuario', usuarioSchema)

export default ModelUsuario