// Create a script that uses the Node.js core fs.writeFile() (callback API) method to write a text file.
// The documentation for this method is on the Node.js File system page.

import { readFile } from "node:fs";

readFile(
  "message.txt",
  "utf8",
  (err, data) => {
    callback(err, data);
  }
);

function callback(err, data) {
  console.log(data);
}
