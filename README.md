# NodeJS S3 upload file

1. Clone repository

  >>https://github.com/anevaraz/nodejs-s3-upload-file.git

2. Install dependencies

  >>yarn

3. Run project

  >>yarn start

4. Project running at:

  >>*http://localhost:4000*

5. :heavy_check_mark: Import file "import_insomnia_workspace" into Insomnia.

## Routes

### GET

  >>/storage

  * This route list all files in your S3 bucket.

### POST
  
  >>/storage/add/key

  add file in your header multipart/form-data:
    
    name= "file"
    value= "append_your_file"

  * This route add file in your S3 bucket root directory.


  >>/storage/add/key?folder=*foldername*

  add file in your header multipart/form-data:
    
    name= "file"
    value= "append_your_file"

  * This route add file in a folder.


  >>/storage/add/folder?folder=*foldername*

  * This route add folder in S3 bucket root directory.

### DELETE

  >>/storage/delete/file/*filename*

  * This route delete file.

  >>/storage/delete/file/*filename*?folder=*foldername*

  * This route delete file in a folder.

  ## CAUTION RECURSIVE DELETE METHOD, ONLY USE WITH VERIFICATION IN 2 STEPS
  
    >>/storage/delete/folder/*foldername*

    * This route delete folder recursive method.

  ## CAUTION RECURSIVE DELETE METHOD, ONLY USE WITH VERIFICATION IN 2 STEPS


