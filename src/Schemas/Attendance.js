import mongoose from 'mongoose'

const attendanceSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  student_id: mongoose.Types.ObjectId,
  subject_id: mongoose.Types.ObjectId,
  code_used: { type: String },
}, { timestamps: true })

const product = mongoose.model('Attendance', attendanceSchema)
export default product
