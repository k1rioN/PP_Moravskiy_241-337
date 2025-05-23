const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.writeHead(200);
  res.write('Hello world from /');
  res.end();
});

app.get('/2', (req, res) => {
  res.writeHead(200);
  res.write('Hello world from /2');
  res.end();
});

app.get('/danya', (req, res) => {
  res.writeHead(200);
  res.write('Hello world from DANIIL MORAVSKIY');
  res.end();
});

app.post('/post', (req, res) => {
  res.writeHead(200);
  res.write('Data from post :)');
  res.end();
});

app.listen(3000, () => console.log('Listening on port 3000'));
