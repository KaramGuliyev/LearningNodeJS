import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("Habibi Noticed!");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");

  const jsonResponseBody = JSON.stringify({ location: "Mars" });

  response.end(jsonResponseBody);
});

server.listen(3005, () => {
  console.log(`Server running at http://localhost:3005`);
});

// < Content-Length: 19
