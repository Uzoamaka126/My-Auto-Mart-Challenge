/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import express from 'express';

const hostname = 'localhost';
const port = 3001;
// const server = http.createServer((request, response) => {
//   response.statusCode = 200;
//   response.setHeader('Content-Type', 'text/plain');
//   response.end('Hello world!\n');
// });

const app = express();

app.get('/', (request, response) => response.send('The API is working'));

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
