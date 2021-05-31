/* eslint-disable no-await-in-loop */
import 'dotenv/config'
import Subject from '../Schemas/Subject'

class SubjectModel {
  async createSubject (name, expiresAt) {
    const subject = new Subject({
      name,
      expires_at: new Date(expiresAt),
    })
    subject.save()
    return subject
  }

  async addStudents (subjectId, stringStudentIds) {
    const studentIds = stringStudentIds.replace(/\s/g, '').split(',')

    const results = {
      addedStudents: [],
      alreadyExistingStudents: [],
    }

    for (let id = 0; id < studentIds.length; id += 1) {
      const query = await Subject.findOneAndUpdate(
        { _id: subjectId, 'students_enrolled.id': { $ne: studentIds[id] } },
        { $addToSet: { students_enrolled: { id: studentIds[id] } } },
        { new: true },
      )

      if (query == null) {
        results.alreadyExistingStudents.push(studentIds[id])
      } if (query) {
        results.addedStudents.push(studentIds[id])
      }
    }

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
}

export default new SubjectModel()
