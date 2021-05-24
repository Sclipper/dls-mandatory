import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: value => validator.isEmail(value),
  },
  refresh_token: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'student', 'teacher'] },
}, { timestamps: true })

const product = mongoose.model('User', userSchema)
export default product
