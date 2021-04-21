import 'dotenv/config'

/**
 * Usually i use functional approach of programming, but in MVC the models are usually
 * class components so i just made them that.
 */

class Generate {
  async randomFunction () {
    try {
      console.log('do come model stuff')
      return 'test'
    } catch (err) {
      console.log('err', err)
      return err
    }
  }
}

export default new Generate()
