/*
 * Basic functionality
 */

// print string
console.log("Hello World");

// Global object
// console.log(global);

// work with core modules
const os = require("os");
const path = require("path");

// load custom module
const math = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

// print current directory
console.log(__dirname);
// print current filename
console.log(__filename);

// print directory, filename and extension useing path module
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

// get all file info as object
console.log(path.parse(__filename));

// call functions from custom module
console.log(math.add(2, 3));
console.log(math.subtract(2, 3));
console.log(math.multiply(2, 3));
console.log(math.divide(2, 3));
