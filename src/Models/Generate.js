import 'dotenv/config'
import { requiresAuth } from 'express-openid-connect'

/**
 * Usually i use functional approach of programming, but in MVC the models are usually
 * class components so i just made them that.
 */

class Generate {
  async authenticationCheck (req, res) {
    res.send(req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : 'Logged out')
  }
}

export default new Generate()
