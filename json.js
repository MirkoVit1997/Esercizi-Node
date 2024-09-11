const http = require("node:http");

const server = http.createServer((request, response) => {
    console.log("request received");

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");

    const jsonResponseBody = JSON.stringify({ location: "Mars" });

    response.end(jsonResponseBody);
});

server.listen(3001, () => {
    console.log(`Server running at http://localhost:3001`);
});

/* 
Per eseguire il server e inviargli una richiesta con powershell ho utilizzato il comando:
Invoke-WebRequest -Uri "http://localhost:3000" -Verbose
*/