import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from './env'

export const generateAccessToken = user => jwt.sign(
  user,
  ACCESS_TOKEN_SECRET, { expiresIn: '30m' },
  // ACCESS_TOKEN_SECRET, { expiresIn: '10s' },
)
