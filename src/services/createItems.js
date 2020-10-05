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

  s3.headObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `${folder}/`
    }, (err, data) => {
      if (data){
        response.status(400).json({
          message: `This folder already exists with ETag: ${data.ETag}.`
        })
      }
      if (err && err.code === 'NotFound'){
        s3.putObject({
          Bucket: process.env.AWS_BUCKET,
          Key: `${folder}/`
        }, (err, data) => {
          if (err) {
            response.status(404).json({
              message: `Error found when creating folder.`
            })
          }
          if (data) {
            response.status(201).json({
              message: `Folder created successfully with ETag: ${data}.`
            })
          }
        })
      }
    })

  })

module.exports = router
