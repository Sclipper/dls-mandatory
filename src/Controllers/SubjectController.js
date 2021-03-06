import { Router } from 'express'
import subjectModel from '../Models/SubjectModel'
import Subject from '../Schemas/Subject'

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
SubjectController.get('/', async (req, res) => {
  try {
    Subject.find({}, (err, subjects) => {
      res.send(subjects)
    })
  } catch (err) {
    console.log('Error', err)
  }
})

SubjectController.post('/user', async (req, res) => {
  try {
    const { email } = req.body
    const userSubjects = await subjectModel.getUserSubjects(email)
    res.send(userSubjects)
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

SubjectController.delete('/cleanup', async (req, res) => {
  try {
    const deletedSubjects = await subjectModel.deleteOldSubjects()
    res.send(deletedSubjects)
  } catch (err) {
    console.log('Error', err)
  }
})

export default SubjectController
