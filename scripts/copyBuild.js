const fs = require('fs-extra');
const path = require('path');
const config = require('../config/paths');

const buildFolder = config.appBuild;
const rootFolder = path.join(__dirname, '../');

const filesPathsToPresist = [
   buildFolder,
   path.join(rootFolder, '.DS_Store'),
   path.join(rootFolder, '.git')
];

fs.readdir(rootFolder, (err, files) => {
  files.forEach(file => {
     const fullPath = path.join(rootFolder, file);
     if (filesPathsToPresist.indexOf(fullPath) === -1) {
      fs.removeSync(fullPath);
     }
  });

  fs.copy(buildFolder, rootFolder, copyError => {
      if (copyError) {
         throw new Error(copyError)
      }

      console.log("Build folder copy executed");
   });
});
