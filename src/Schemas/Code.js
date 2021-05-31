import mongoose from 'mongoose'

function addMinutes (date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

const codeSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  code: { type: String, unique: true },
  expires_at: { type: Date, default: addMinutes(new Date(), +20) },
  subject_id: mongoose.Types.ObjectId,
}, { timestamps: true })

const product = mongoose.model('Code', codeSchema)
export default product
