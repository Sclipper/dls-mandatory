import 'dotenv/config'
// import { requiresAuth } from 'express-openid-connect'
import Code from '../Schemas/Code'

/**
 * Usually i use functional approach of programming, but in MVC the models are usually
 * class components so i just made them that.
 */

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
