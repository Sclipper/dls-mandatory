import { Router } from 'express'

const GenerateController = Router()

/**
 * Just add each function related to the generation bellow
 */

GenerateController.get('/simple_code', async (req, res) => {
  try {
    console.log('generate stuff here')
  } catch (err) {
    console.log('Error')
  }
})

export default GenerateController
