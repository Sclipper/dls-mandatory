import { Router } from 'express'
import Attendance from '../Models/AttendanceModel'
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
    const { studentId, subjectId, code } = req.body
    const userCode = await Code.find({ code })

    if (userCode[0].expires_at > new Date()) {
      const attendance = await Attendance.registerAttendance(studentId, subjectId, userCode[0].code)
      res.send(attendance)
    } else {
      res.send({ error: 'Code is expired' })
    }
  } catch (err) {
    console.log('Error', err)
  }
})

export default AttendanceController
