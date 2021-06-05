/* eslint-disable no-await-in-loop */
import 'dotenv/config'
import Subject from '../Schemas/Subject'
import Attendance from '../Schemas/Attendance'
import Code from '../Schemas/Code'

class SubjectModel {
  async createSubject (name, expiresAt) {
    const subject = new Subject({
      name,
      expires_at: new Date(expiresAt),
    })
    subject.save()
    return subject
  }

  async addStudents (subjectId, studentIds) {
    const results = {
      addedStudents: [],
      alreadyExistingStudents: [],
    }

    studentIds.forEach(async id => {
      const query = await Subject.findOneAndUpdate(
        { _id: subjectId, 'students_enrolled.id': { $ne: id } },
        { $addToSet: { students_enrolled: { id } } },
        { new: true },
      )
      console.log('query', query)
      if (query == null) {
        results.alreadyExistingStudents.push(studentIds)
      } if (query) {
        results.addedStudents.push(studentIds)
      }
    })

    return results
  }

  async deleteStudents (subjectId, stringStudentIds) {
    const studentIds = stringStudentIds.replace(/\s/g, '').split(',')

    const subject = await Subject.findOneAndUpdate(
      { _id: subjectId },
      { $pull: { students_enrolled: { id: { $in: studentIds } } } },
      { new: true },
    )
    return subject
  }

  async addTeachers (subjectId, stringTeacherIds) {
    const teacherIds = stringTeacherIds.replace(/\s/g, '').split(',')

    const results = {
      addedTeachers: [],
      alreadyExistingTeachers: [],
    }

    for (let id = 0; id < teacherIds.length; id += 1) {
      const query = await Subject.findOneAndUpdate(
        { _id: subjectId, 'responsible_teachers.id': { $ne: teacherIds[id] } },
        { $addToSet: { responsible_teachers: { id: teacherIds[id] } } },
        { new: true },
      )

      if (query == null) {
        results.alreadyExistingTeachers.push(teacherIds[id])
      } if (query) {
        results.addedTeachers.push(teacherIds[id])
      }
    }

    return results
  }

  async deleteTeachers (subjectId, stringTeacherIds) {
    const teacherIds = stringTeacherIds.replace(/\s/g, '').split(',')

    const subject = await Subject.findOneAndUpdate(
      { _id: subjectId },
      { $pull: { responsible_teachers: { id: { $in: teacherIds } } } },
      { new: true },
    )
    return subject
  }

  async deleteOldSubjects () {
    await Subject.deleteMany({ expires_at: { $lt: new Date() } })
    const allSubjects = await Subject.find()
    const subjectsToKeep = []
    for (let i = 0; i < allSubjects.length; i += 1) {
      // eslint-disable-next-line no-underscore-dangle
      subjectsToKeep.push(allSubjects[i]._id)
    }
    await Attendance.deleteMany({ subject_id: { $nin: subjectsToKeep } })
    await Code.deleteMany({ subject_id: { $nin: subjectsToKeep } })
    return allSubjects
  }
}

export default new SubjectModel()
