const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const storageRoute = require('./routes')

dotenv.config()

const app = express()
const port = process.env.NODE_PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => response.sendStatus(200))

app.use('/storage', storageRoute)

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
