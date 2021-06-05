import { Router } from 'express'
import Attendance from '../Models/AttendanceModel'
import User from '../Schemas/User'
import Code from '../Schemas/Code'

const AttendanceController = Router()

AttendanceController.post('/token', async (req, res) => {
  try {
    const { subjectId } = req.body
    const code = await Attendance.createToken(subjectId)
    res.send({ code: code.code })
  } catch (err) {
    console.log('Error', err)
  }
})

AttendanceController.post('/register', async (req, res) => {
  try {
    const { email, subjectId, code } = req.body
    const student = await User.find({ email })
    // eslint-disable-next-line no-underscore-dangle
    const studentId = student?.[0]?._id
    const userCode = await Code.find({ code })
    console.log('code', userCode)
    if (userCode[0].expires_at > new Date()) {
      const attendance = await Attendance.registerAttendance(studentId, subjectId, userCode[0].code)
      res.send(attendance)
    } else {
      res.send({ error: 'No code has been found' })
    }
  } catch (err) {
    console.log('Error', err)
  }
})

export default AttendanceController
