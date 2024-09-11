const http = require("node:http");

const server = http.createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    "<html><body><h1>Benvenuto nel mio server Node.js!</h1><p>Questo è un messaggio personalizzato.</p></body></html>"
  );
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});