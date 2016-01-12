var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var orm = require('sqlite3-orm');

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
  orm.read({entity: 'person', type: 'collection'}, function(arr){
    res.json(arr);
  });
});
app.get('/person/:idperson', function(req, res){

});
app.post('/person', function(req, res){
  orm.create({entity: 'person', subject: req.body}, function(){
    res.json({code: 0});
  });
});
app.put('/person/:idperson', function(req, res){
  orm.update({entity: 'person', subject: req.body, where: {id: req.params.idperson}}, function(){
    res.json({code: 0});
  });
});
app.delete('/person/:idperson', function(req, res){
  orm.delete({entity: 'person', where: {id: req.params.idperson}}, function(){
    res.json({code: 0});
  });
});
orm.connect('dbtest');

app.listen(80);
