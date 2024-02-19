const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.headers, req.method);

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    fs.readFile("msg.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.write("<html>");
      res.write("<head><title>Message</title></head>");
      res.write(
        `<body><form action='/msg' method='POST' ><input type='text' name='msg'><button type='submit'>Send</button></form><br/><h4>${data}</h4></body>`
      );
      res.write("</html>");
      return res.end();
    });
  } else if (url === "/msg" && method === "POST") {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
      console.log(chunk);
    });
    return req.on("end", () => {
      const parseData = Buffer.concat(data).toString();
      console.log(parseData);
      const message = parseData.split("=")[1];
      fs.writeFile("msg.txt", message, (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Internal Server Error");
        }
        res.writeHead(302, { Location: "/" });
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>404</title></head>");
    res.write("<body><h2>Not Found</h2></body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(4000);
