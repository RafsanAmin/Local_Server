//import
const fs = require('fs');
const path = require('path');
const express = require('express');
const upload = require('./middlewares/multer');
const getFilesList = require('./util/getFileList');
const archiver = require('archiver');
//init

const cdir = process.cwd();

const app = express();
const port = Number(process.argv.slice(2)[0]) || 8000;
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//routes
app.get('/', async (req, res) => {
  const arr = await getFilesList();
  res.render('index', { upFile: arr });
});
app.get('/downloadAll', (req, res) => {
  const downPath = cdir + '/download.zip';
  const arch = archiver('zip', { zlib: 9 });
  const output = fs.createWriteStream(downPath);
  output.on('close', function () {
    console.log(arch.pointer() + ' total bytes');
    res.sendFile(downPath);
  });
  output.on('end', function () {
    console.log('Done');
  });
  arch.pipe(output);
  arch.directory('uploads/', false);
  arch.finalize();
});
app.get('/downloadFile/:name', (req, res) => {
  res.sendFile(cdir + '/uploads/' + req.params.name);
});
app.post('/uploadFile', upload, (req, res) => {
  res.render('Success', { files: req.files, work: 'Upload' });
});
app.get('/deleteFile/:name', (req, res) => {
  fs.unlinkSync(cdir + '/uploads/' + req.params.name);
  res.redirect('/');
});
//logs
app.listen(port, () => console.log(`Server running at port ${port}`));
