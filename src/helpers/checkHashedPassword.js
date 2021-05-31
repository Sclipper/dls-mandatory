import bcrypt from 'bcrypt'

export const checkHashedPassword = ({ password, hash }) => bcrypt
  .compare(password, hash).then(res => res)
