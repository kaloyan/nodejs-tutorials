/*
 * Read and Write content from streams
 */

const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "lorem-new.txt"));

rs.on("data", (dataChunk) => {
  console.log(dataChunk);
  // write data to file stream
  ws.write(dataChunk);
});

// faster method
// rs.pipe(ws);
