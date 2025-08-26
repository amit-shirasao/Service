// const http = require('http');
const express = require('express');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, India!\n');
// });
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// server.listen(3000, 'localhost', () => {
//   console.log('Server running at http://localhost:3000/');
// });
app.listen(4000, () => {
  console.log('Express app listening on port 4000');
});

app.get('/', (req, res) => {
  res.send('Get all employees.');
});
