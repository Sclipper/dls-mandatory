import 'dotenv/config'
import User from '../Schemas/User'
import Subject from '../Schemas/Subject'
import { hashPassword } from '../helpers'

class UserModel {
  async createUser ({ firstName, lastName, email, role, refreshToken, password }) {
    const user = new User({
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      refresh_token: refreshToken,
      password: hashPassword(password),
    })
    user.save()
    return user
  }

  async deleteUsers (ids) {
    const user = await User.deleteMany({ _id: { $in: ids } })
    return user
  }

  async getUserSubjects (id) {
    const userSubjects = await Subject.find({ 'students_enrolled.id': id })
    return userSubjects
  }

  async getStudents () {
    const allStudents = await User.find({ role: 'student' })
    return allStudents
  }
}

export default new UserModel()
