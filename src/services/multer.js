const multerS3 = require ('multer-s3')
const aws = require ('aws-sdk')

const storage = multerS3({
  s3: new aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_DEFAULT_REGION
  }),
  bucket: (request, file, callback) => {
    callback(null, process.env.AWS_BUCKET)
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (request, file, callback) => {
    const date = new Date().toISOString()
    const folder = request.query.folder
    const name = file.originalname
    const fileName = folder ? `${folder}/${date}_${name}` : `${date}_${name}`
    callback(null, fileName)
  },
})

module.exports = {
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'application/pdf'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    }else {
      callback(new Error('Invalid file type'))
    }
  }
}
