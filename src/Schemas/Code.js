import mongoose from 'mongoose'

const crypto = require('crypto')

/**
 * Here is an example on how we can describe our schemas so we can easily see what the
 * other did
 */

function addMinutes (date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

const codeSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  code: { type: String, unique: true, default: crypto.randomBytes(8).toString('hex') },
  expires_at: { type: Date, default: addMinutes(new Date(), 20) },
  students: [
    {
      id: mongoose.Types.ObjectId,
      email: String,
      present: Boolean,
    },
  ],
}, { timestamps: true })

const product = mongoose.model('Code', codeSchema)
export default product
