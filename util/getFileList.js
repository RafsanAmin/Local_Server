const fs = require('fs');
const getFilesList = () => {
  return new Promise((resolve, reject) => {
    const arr = [];
    fs.opendir(process.cwd() + '/uploads', (err, dir) => {
      while (1) {
        const rfile = dir.readSync();
        if (rfile === null) {
          break;
        } else {
          arr.push(rfile.name);
        }
      }
      dir.closeSync();
      resolve(arr);
    });
  });
};

module.exports = getFilesList;
