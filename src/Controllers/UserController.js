import { Router } from 'express'
import userModel from '../Models/UserModel'

const UserController = Router()

UserController.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body
    const createdUser = await userModel.createUser({ firstName, lastName, email, role })
    res.send(createdUser)
  } catch (err) {
    console.log('Error', err)
  }
})

UserController.delete('/', async (req, res) => {
  try {
    const { ids } = req.body
    const stringIds = ids.replace(/\s/g, '').split(',')
    const deletedUsers = await userModel.deleteUsers(stringIds)
    res.send(deletedUsers)
  } catch (err) {
    console.log('Error', err)
  }
})

UserController.get('/subjects', async (req, res) => {
  try {
    const { userId } = req.body
    const userSubjects = await userModel.getUserSubjects(userId)
    console.log(userSubjects)
    res.send(userSubjects)
  } catch (err) {
    console.log('Error', err)
  }
})

export default UserController
