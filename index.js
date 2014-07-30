var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');

//Connect to database.
var couchbase = require('couchbase');
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, function(err) {//using the beer-sample bucket
    if (err) {
      console.log('Connection Error', err);
    } else {
      console.log('Connected!');
  }
 });
console.log(db);
//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs:




var server = Hapi.createServer('localhost', 8080);

var logCont = { };

//creat hanlder function for landing page
logCont.landingPage = {
  handler: function(req, reply){
    reply ('Welcome to LogIt! Application is under construction!');
  }
};

//
logCont.addNewDoc = {
  //Add document with the add function
  handler: function(req, reply){

    var payload = {
      "personId": "string",
      "date": {"type" : "date", "default": "Date.now"},
      "muscleGroup": "string",
      "exercise": "string",
      "sets": [{"reps": "number", "Kg": "number"}]
    };

    db.add("personId", payload , function(result){
      if(err) console.error('Error: ' + err);
      console.log(result);
      reply ("Log added successfully!");
    });
  }
};

logCont.fetchDoc = {
  handler: function(req, reply){
    var fname = req.params.name;
    db.get(fname,  function(err, result){
      if(err) console.log('Error: ' + err);
        console.log(result.value.date);
        return reply("Your request to " + fname + " :" + "<br> Date: " + result.value.date.default + "<br> Muscle Group: " + result.value.musclegroup + "<br>Exercise: " + result.value.exercise + "<br>Sets: " + result.value.Sets);
    });
  }
};


var routes = [

//Route to custom database
  {path: '/', method: 'GET', config: logCont.landingPage},
  {path: '/addnewuser/{personId}', method: 'POST', config: logCont.addNewDoc},
  {path: '/logs/{name}', method: 'GET', config: logCont.fetchDoc}
];

server.route(routes);


server.start(function(){
  console.log('Go to localhost:8080/');
});



module.exports = server;
