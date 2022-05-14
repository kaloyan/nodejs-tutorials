/*
 * Work with directores
 */

const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "files", "newdir"))) {
  // create new directory
  fs.mkdir(path.join(__dirname, "files", "newdir"), (err) => {
    if (err) throw err;
    console.log("new directory created");
  });
} else {
  console.log("directory allready exist");
}

if (fs.existsSync(path.join(__dirname, "files", "newdir"))) {
  // remove directory
  fs.rmdir(path.join(__dirname, "files", "newdir"), (err) => {
    if (err) throw err;
    console.log("directory removed");
  });
}
