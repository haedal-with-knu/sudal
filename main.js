var express = require('express');
var app = express();
var ejs = require('ejs');
var session = require('express-session')

app.set('trust proxy', 1) // trust first proxy

app.set('views', __dirname + '/public');

app.use(express.static(__dirname + '/src'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const routes = require('./routes');
app.use('/', routes);

app.all('*', function(req, res){
  res.status(404).send('404 Error!');
});

app.listen(3000);
