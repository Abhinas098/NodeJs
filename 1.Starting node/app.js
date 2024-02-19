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
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
      console.log(chunk);
    });
    req.on("end", () => {
      const parseData = Buffer.concat(data).toString();
      console.log(parseData);
      const message = parseData.split("=")[1];
      fs.writeFileSync("msg.txt", message);
    });
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
