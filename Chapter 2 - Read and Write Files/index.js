const fs = require("fs");
const path = require("path");

// read file from filesystem async
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;

    console.log(data.toString());
  }
);

// write file to filesystem
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Data Output",
  (err) => {
    if (err) throw err;
    console.log("Operation complete");
  }
);

// append content to existing file
fs.appendFile(
  path.join(__dirname, "files", "append.txt"),
  "append content\n",
  (err) => {
    if (err) throw err;
    console.log("content appended to file.");
  }
);

// rename file
fs.rename(
  path.join(__dirname, "files", "append.txt"),
  path.join(__dirname, "files", "appens-new.txt"),
  (err) => {
    if (err) throw err;
    console.log("file renamed");
  }
);

// delete file
fs.unlink(path.join(__dirname, "files", "appens-new.txt"), (err) => {
  if (err) throw err;
  console.log("file deleted.");
});

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
