import mongoose from 'mongoose'

function addMinutes (date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

const codeSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
<<<<<<< HEAD
  code: { type: String, unique: true, default: crypto.randomBytes(8).toString('hex') },
  teacher: String,
  classId: String,
=======
  code: { type: String, unique: true },
>>>>>>> 508a71e5f487d2fad3d8f033c878a81e20928d9b
  expires_at: { type: Date, default: addMinutes(new Date(), 20) },
  subject_id: mongoose.Types.ObjectId,
}, { timestamps: true })

const product = mongoose.model('Code', codeSchema)
export default product
