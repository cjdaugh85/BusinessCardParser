const fs = require('fs-extra');

const listFilesInDirectory = (dirPath) => {
    fs.readdirSync(dirPath).forEach(file => {
        console.log(file);
    })
};

const emptyDir = (dir) => {
    fs.emptyDirSync(dir);
};

module.exports = {
  listFilesInDirectory,
  emptyDir
};