import 'dotenv/config'
import Code from '../Schemas/Code'
import AttendanceSchema from '../Schemas/Attendance'

const crypto = require('crypto')

class Attendance {
  async createToken (subjectId) {
    const code = new Code({ subject_id: subjectId, code: crypto.randomBytes(8).toString('hex') })
    code.save()
    return code
  }

  async registerAttendance (studentId, subjectId, code) {
    const attendance = new AttendanceSchema({
      student_id: studentId,
      subject_id: subjectId,
      code_used: code,
    })
    attendance.save()
    return attendance
  }
}

export default new Attendance()
