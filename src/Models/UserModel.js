import 'dotenv/config'
import User from '../Schemas/User'
import Subject from '../Schemas/Subject'

class UserModel {
  async createUser (firstName, lastName, email, role) {
    const user = new User({
      first_name: firstName,
      last_name: lastName,
      email,
      role,
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
}

export default new UserModel()
