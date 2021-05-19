import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import AttendanceController from './src/Controllers/AttendanceController'
import UserController from './src/Controllers/UserController'
import SubjectController from './src/Controllers/SubjectController'
import 'dotenv/config'

const app = express()
mongoose.connect(`${process.env.MONGO_DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/attendance', AttendanceController)
app.use('/users', UserController)
app.use('/subjects', SubjectController)

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
