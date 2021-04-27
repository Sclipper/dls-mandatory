import { Router } from 'express'
import Generate from '../Models/Generate'
import Code from '../Schemas/Code'

const GenerateController = Router()

/**
 * Just add each function related to the generation bellow
 */

GenerateController.get('/', async (req, res) => {
  try {
    // Generate.authenticationCheck(req, res)
  } catch (err) {
    console.log('Error')
  }
})
GenerateController.get('/token', async (req, res) => {
  try {
    const code = await Generate.createToken()
    res.sent({ code: code.code })
  } catch (err) {
    console.log('Error')
  }
})
GenerateController.post('/attendance', async (req, res) => {
  try {
    const { email, code } = req.body
    const userCode = await Code.find({ code })
    // Todo: && code is not expired

    // eslint-disable-next-line no-underscore-dangle
    const id = userCode[0]._id
    if (userCode) {
      Code.updateOne(
        { _id: id },
        { $push: { students: { email, present: true } } },
      )
    }
    res.send('Attendance counted')
  } catch (err) {
    console.log('Error', err)
  }
})

export default GenerateController