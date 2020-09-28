const express = require('express')

const listItemsService = require('./services/listItems')
const createItemsService = require('./services/createItems')
const deleteItemsService = require('./services/deleteItems')

const app = express()

app.use('/', listItemsService)
app.use('/add', createItemsService)
app.use('/delete', deleteItemsService)

module.exports = app
