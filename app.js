var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var mapper = require('sqlite3_mapper').dbpath('dbtest');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/app.html');
});
app.get('/person', function(req, res){
  mapper.read({entity: 'person', type: 'collection'}, function(arr){
    res.json(arr);
  });
});
app.get('/person/:idperson', function(req, res){

});
app.post('/person', function(req, res){
  mapper.create({entity: 'person', subject: req.body}, function(){
    res.json({code: 0});
  });
});
app.put('/person/:idperson', function(req, res){
  mapper.update({entity: 'person', subject: req.body, where: {id: req.params.idperson}}, function(){
    res.json({code: 0});
  });
});
app.delete('/person/:idperson', function(req, res){
  mapper.delete({entity: 'person', where: {id: req.params.idperson}}, function(){
    res.json({code: 0});
  });
});
app.listen(80);
