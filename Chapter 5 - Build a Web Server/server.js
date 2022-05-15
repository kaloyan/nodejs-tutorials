const http = require("http");
const path = require("path");
const fs = require("fs");
// const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
// initialize log emitter
const myEmitter = new Emitter();
// add listener for the log event
myEmitter.on("log", (msg, logFile) => logEvents(msg, logFile));

const PORT = process.env.PORT || 3000;

const serveFile = async (filePath, contentType, response) => {
  try {
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      response.writeHead(200, { "Content-Type": contentType });
      response.end(data);
    });
  } catch (err) {
    console.error(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "error-log.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // emit event
  myEmitter.emit("log", `${req.url}\t${req.method}`, "request-log.txt");

  let contentType;
  const extension = path.extname(req.url);

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
      break;
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    serveFile(filePath, contentType, res);
  } else {
    // send 404 - not exist or 301 -redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), contentType, res);
        break;
    }
  }
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
