import { Router } from 'express'
import Generate from '../Models/Generate'

const GenerateController = Router()

/**
 * Just add each function related to the generation bellow
 */

GenerateController.get('/', async (req, res) => {
  try {
    Generate.authenticationCheck(req, res)
  } catch (err) {
    console.log('Error')
  }
})

export default GenerateController
