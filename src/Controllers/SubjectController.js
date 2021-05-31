import { Router } from 'express'
import subjectModel from '../Models/SubjectModel'

const SubjectController = Router()

SubjectController.post('/create', async (req, res) => {
  try {
    const { name, expiresAt } = req.body
    const createdSubject = await subjectModel.createSubject(name, expiresAt)
    res.send(createdSubject)
  } catch (err) {
    console.log('Error', err)
  }
})

SubjectController.post('/add/student', async (req, res) => {
  try {
    const { subjectId, studentIds } = req.body
    const addedToSubject = await subjectModel.addStudents(subjectId, studentIds)
    res.send(addedToSubject)
  } catch (err) {
    console.log('Error', err)
  }
})

SubjectController.delete('/delete/student', async (req, res) => {
  try {
    const { subjectId, studentIds } = req.body
    const deletedFromSubject = await subjectModel.deleteStudents(subjectId, studentIds)
    res.send(deletedFromSubject)
  } catch (err) {
    if ('reason' in err) {
      res.send({ error: 'Incorrect student or subject ID' })
    }
    console.log('Error', err)
  }
})

SubjectController.post('/add/teacher', async (req, res) => {
  try {
    const { subjectId, teacherIds } = req.body
    const addedToSubject = await subjectModel.addTeachers(subjectId, teacherIds)
    res.send(addedToSubject)
  } catch (err) {
    console.log('Error', err)
  }
})

SubjectController.delete('/delete/teacher', async (req, res) => {
  try {
    const { subjectId, teacherIds } = req.body
    const addedToSubject = await subjectModel.deleteTeachers(subjectId, teacherIds)
    res.send(addedToSubject)
  } catch (err) {
    console.log('Error', err)
  }
})

export default SubjectController
