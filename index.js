//import
const fs = require('fs');
const express = require('express');
const upload = require('./middlewares/multer');
const getFilesList = require('./util/getFileList');
//init
const app = express();
const port = 80;

app.use(express.static('public/'));
app.set('view engine', 'ejs');
//routes
app.get('/', async (req, res) => {
  const arr = await getFilesList();
  res.render('index', { upFile: arr });
});
app.get('/downloadFile/:name', (req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.name);
});
app.post('/uploadFile', upload, (req, res) => {
  res.render('Success', { files: req.files, work: 'Upload' });
});
app.get('/deleteFile/:name', (req, res) => {
  fs.unlinkSync(__dirname + '/uploads/' + req.params.name);
  res.redirect('/');
});
//logs
app.listen(port, () => console.log(`Server running at port ${port}`));
