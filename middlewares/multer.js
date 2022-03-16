const multer = require('multer');
const multerStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const name = file.originalname;
    cb(null, name);
  },
});
const upload = multer({
  storage: multerStorage,
}).array('file');

module.exports = upload;
