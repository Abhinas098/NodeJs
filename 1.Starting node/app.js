const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers, req.method);

  if (req.url === "/home") {
    res.setHeader("Content-Type", "text/plain");
    res.end(" Welcome to Home Us page");
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "text/plain");
    res.end(" Welcome to About Us page");
  } else if (req.url === "/") {
    res.setHeader("Content-Type", "text/plain");
    res.end(" Hello World!");
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
