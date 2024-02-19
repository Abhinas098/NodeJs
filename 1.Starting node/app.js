const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.headers, req.method);

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Message</title></head>");
    res.write(
      "<body><form action='/msg' method='POST' ><input type='text' name='msg'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/msg" && method === "POST") {
    fs.writeFileSync("msg.txt", "Hello World");
    // res.statusCode = 302;
    // res.setHeader("Location", "/");
    res.writeHead(302, { Location: "/" });
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>404</title></head>");
  res.write("<body><h2>Not Found</h2></body>");
  res.write("</html>");
  res.end();
});

server.listen(4000);
