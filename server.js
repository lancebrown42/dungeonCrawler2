
// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Routes \\


app.get('/', function(req, res){
  res.sendFile('index.html', {root : './public'})
});
app.get('/game', function(req,res){
  res.sendFile('html/game.html'{root: './public'})
})
// Creating Server and Listening for Connections \\
var port = process.env.PORT || 80
app.listen(port, function(){
  console.log('Server running on port ' + port);

});