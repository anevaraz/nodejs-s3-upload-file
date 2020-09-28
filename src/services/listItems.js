const express = require('express')
const aws = require('aws-sdk')

const s3 = new aws.S3()

const router = express.Router()

router.get('/', async (request, response) => {
  const { prefix , delimiter} = request.query
  const listBucket = await s3.listObjectsV2({
    Prefix: prefix,
    Delimiter: delimiter,
    Bucket: process.env.AWS_BUCKET
  }).promise()

  return response.json(listBucket)
})

module.exports = router
