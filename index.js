import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import GenerateController from './src/Controllers/GenerateController'
import 'dotenv/config'

const app = express()
mongoose.connect(`mongodb+srv://root:${process.env.MONGO_PASS}/${process.env.CLUSTER_NAME}?retryWrites=true&w=majority`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

/**
 * We can use MVC paradigm (no Views here so just MC).
 * Basically the endpoints will be constructed with this frame
 * http://basicURL/nameOfController/endpoint
 * You can see an example bellow we call the generate controller with the extension /generate
 * and if you go to that controller you then can call a function of that
 */
app.use('/generate', GenerateController)

app.listen(8080, () => console.log('Example app listening on port 8080!'))
