import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from './env'

// eslint-disable-next-line consistent-return
export const authenticateToken = (req, res, next) => {
  const authHeader = req?.headers?.authorization
  const token = authHeader?.split(' ')?.[1]
  if (!token) {
    return res.send(401)
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403)
      res.send('Your token is invalid')
    }
    req.user = user
    next()
  })
}
