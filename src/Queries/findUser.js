import User from '../Schemas/User'

export const findUser = async keyValuePair => User.find(keyValuePair)
  .then(user => user)
  .catch(err => err)
