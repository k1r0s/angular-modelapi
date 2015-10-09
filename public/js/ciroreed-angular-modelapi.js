angular.module('ngModelapi', [])
.factory('rest$api', function($http){
  var GET_METHOD = 'get',  PUT_METHOD = 'put',  POST_METHOD = 'post',  DELETE_METHOD = 'delete';
  var _apiConnection = function(method, path, callback, data){
    if(!configured){throw new Error('ngRestapi must be configured to provide api data')}
    $http[method](APPLICATION_URL + path, data || null).success(function(response){
      callback(response);
    });
  }
  this.new = function(){
    return new model.class();
  }
  this.retrieve = function(callback){
    var coll = [];
    _apiConnection(GET_METHOD, model.name, function(r){
      r.forEach(function(m){
        coll.push(new model.class(m));
      });
      callback(coll);
    });
  }
  this.create = function(args, callback){
    _apiConnection(POST_METHOD, model.name, function(){
      self.retrieve(callback);
    }, args);
  }
  this.update = function(id, args, callback){
    _apiConnection(PUT_METHOD,  model.name + '/' + id, function(){
      self.retrieve(callback);
    }, args);
  }
  this.delete = function(id, callback){
    _apiConnection(DELETE_METHOD, model.name + '/' + id, function(){
      self.retrieve(callback);
    });
  }
  this.configure = function(opts){
    APPLICATION_URL = opts.apiRoot;
    model = opts.model;
    configured = true;
  }
  var APPLICATION_URL;
  var model = {};
  var configured = false;
  var self = this;
  return this;
})
.factory('rest$model', function(){
  this.configure = function(options){
    return function(attrs){
      var defaults = options;
      this.getProperties = function(){
        return Object.keys(defaults);
      }
      this.constructor = function(attrs){
        for (var key in defaults) {
          this[key] = attrs[key] || defaults[key];
        }
      }
      return this.constructor(attrs || {});
    };
  }
  return this;
});
