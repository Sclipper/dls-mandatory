/* eslint-disable no-underscore-dangle */
import { Router } from 'express'
import AttendanceModel from '../Models/AttendanceModel'
import Attendance from '../Schemas/Attendance'
import User from '../Schemas/User'
import Code from '../Schemas/Code'
import { findUser } from '../Queries/findUser'

const AttendanceController = Router()

AttendanceController.post('/token', async (req, res) => {
  try {
    const { subjectId } = req.body
    const code = await AttendanceModel.createToken(subjectId)
    res.send({ code: code.code })
  } catch (err) {
    console.log('Error', err)
  }
})
AttendanceController.post('/', async (req, res) => {
  try {
    const { email } = req.body
    const users = await findUser({ email })
    const user = users[0]
    Attendance.find({}, (err, attendance) => {
      res.send(attendance.filter(x => x.student_id.toString() === user._id.toString()))
    })
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
      const attendance = await AttendanceModel
        .registerAttendance(studentId, subjectId, userCode[0].code)
      res.send(attendance)
    } else {
      res.send({ error: 'No code has been found' })
    }
  } catch (err) {
    console.log('Error', err)
  }
})

export default AttendanceController
