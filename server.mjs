import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const data = new Uint8Array(Buffer.from('Habibi text file'));

function callback(err) {
  if (err) throw err;
  console.log('The file has been saved!');
}

writeFile('habibi.txt', data, callback);
