import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("Habibi noticed!");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    "<html><body><h1>Habibi welcome to my server.</h1></body></html>"
  );
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
