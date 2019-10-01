const multer = require('multer');

const MIME_Type_Map = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
  }
  
  const storingFile =  multer.diskStorage({
    destination: (req, file, cb) =>{
      console.log(file);
      let isValid = MIME_Type_Map[file['mimetype']];
      let error = new Error("Invalid MimeType");
      if(isValid){
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const fileName = file['originalname'].toLowerCase().split(' ').join('-');
      const extention = MIME_Type_Map[file['mimetype']];
      cb(null, fileName + '-' + Date.now() +'.' + extention );
    }
  });

  module.exports = multer({storage : storingFile}).single("image");