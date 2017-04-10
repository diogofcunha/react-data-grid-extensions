const fs = require('fs-extra');
const path = require('path');
const config = require('../config/paths');

const buildFolder = config.appBuild;
const rootFolder = path.join(__dirname, '../');

fs.readdir(rootFolder, (err, files) => {
  files.forEach(file => {
     const fullPath = path.join(rootFolder, file);
     if (fullPath !== buildFolder) {
        fs.removeSync(fullPath);
     }
  });

  fs.copy(buildFolder, rootFolder, err => {
      if (err) {
         throw new Error(err)
      }

      console.log("Build folder copy executed");
   });
});
