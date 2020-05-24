var app = require('express')();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
  });

app.get('/browserMqtt.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/mqtt/browserMqtt.js');
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});
