import mongoose from 'mongoose'

const subjectSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  expires_at: Date,
  students_enrolled: [{
    id: mongoose.Types.ObjectId,
    _id: false,
  }],
  responsible_teachers: [{
    id: mongoose.Types.ObjectId,
    _id: false,
  }],
}, { timestamps: true })

const product = mongoose.model('Subject', subjectSchema)
export default product
