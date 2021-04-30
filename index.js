import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import GenerateController from './src/Controllers/GenerateController'
import 'dotenv/config'

const app = express()
mongoose.connect(`${process.env.MONGO_DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true })
const { auth, requiresAuth } = require('express-openid-connect')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  }),
)

app.use('/generate', GenerateController)

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
