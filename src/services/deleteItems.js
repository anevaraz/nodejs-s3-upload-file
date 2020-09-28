const express = require('express')
const aws = require('aws-sdk')

const s3 = new aws.S3()

const router = express.Router()

router.delete('/file/:name', async (request, response) => {
  const { name } = request.params
  const { folder } = request.query
  await s3.deleteObject({
    Bucket: process.env.AWS_BUCKET,
    Key: folder ? `${folder}/${name}` : name
  }).promise()

  return response.sendStatus(200)
})

// CAUTION RECURSIVE DELETE METHOD, ONLY USE WITH VERIFICATION IN 2 STEPS
router.delete('/folder/:folder', async (request, response) => {
  const { folder } = request.params
  const listedObjects = await s3.listObjectsV2({
    Bucket: process.env.AWS_BUCKET,
    Prefix: `${folder}/`
  }).promise()

  if (listedObjects.Contents.length === 0){
    return
  }

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET,
    Delete: { Objects: [] }
  }

  listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key })
  })

  await s3.deleteObjects(deleteParams).promise()

  return response.sendStatus(200)
})

module.exports = router
