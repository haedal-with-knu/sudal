var express = require('express');
var app = express();
var ejs = require('ejs');
var session = require('express-session')

app.set('trust proxy', 1) // trust first proxy

app.set('views', __dirname + '/public');

app.use(express.static(__dirname + '/src'));

app.use(express.static(__dirname + '/src1'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://sooohh6:rlatnghkd21@ds259079.mlab.com:59079/whereisjellyfish');

const routes = require('./routes');
app.use('/', routes);

app.all('*', function(req, res){
  res.status(404).send('404 Error!');
});


app.listen(3000);
