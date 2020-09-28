const express = require('express')
const aws = require('aws-sdk')
const multer = require('multer')
const multerConfig = require('./multer')

const s3 = new aws.S3()

const router = express.Router()

router.post('/key', multer(multerConfig).single('file'), async (request, response) => {
  const { location, key } = request.file
  const data = { location, key }
  response.status(201).json(data)
})

router.post('/folder', async (request, response) => {
  const { folder } = request.query
  const result = {}
  let status = 201
  s3.headObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `${folder}/`
    }, (err, data) => {
      if (err && err.code === 'NotFound'){
        s3.putObject({
          Bucket: process.env.AWS_BUCKET,
          Key: `${folder}/`
        }, (err2, data2) => {
          if (err2){
            result.message = err2.message
          } else {
            result.message = 'Folder created successfully.'
          }
        })
      }
    }
  )
  response.status(status).json(result)
})

module.exports = router
