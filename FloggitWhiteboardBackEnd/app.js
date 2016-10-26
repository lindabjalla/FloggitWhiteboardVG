var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var routerV1 = require('./controllers/routes/routes-v1');
var cors = require('./middleware/cors');
var io = require('socket.io')(http);
var postitSocket = require('./controllers/socket/postit');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
var logger = require('morgan');

app.use(logger('dev'));
app.use(cors);
app.use('/api/v1', routerV1);

io.on('connection', postitSocket);

http.listen(8080, function() {
  console.log('service started on port 8080, url: http://localhost:8080');
});
