import 'dotenv/config'
import { requiresAuth } from 'express-openid-connect'
import Code from '../Schemas/Code'

class Generate {
  async authenticationCheck (req, res) {
    res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : 'Logged out')
  }

  async createToken () {
    const code = new Code()
    code.save()
    return code
  }
}

export default new Generate()
