var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var _ = require('underscore');


//Connect to database.
var couchbase = require('couchbase');
var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, function(err) {
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

function listUserExercises (req, res){
  db.view("_design/dev_workout", 'exercise').query(function(err, values){
    //we will fetch all the exercise docs based on the personId
    var keys = _.pluck(values, 'personId');

  db.getMulti(keys, function(err, results){
    var listExercises = _.map(results, function(v, k) {
            v.value.personId = k;
            return v.value;
      });
    });
  });
}


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



    db.addMulti(payload , function(result){
      if(err) console.error('Error: ' + err);
      console.log(result);
      reply ("Log added successfully!");
      process.exit(0);
    });
  }
  //validation -----
};




logCont.fetchDoc = {
  handler: function(req, reply){
    console.log(listUserExercises);
        return reply(listUserExercises);
  }
};





var routes = [

//Route to custom database
  {path: '/', method: 'GET', config: logCont.landingPage},
  {path: '/addnewlog/user=personId/{newlog}', method: 'POST', config: logCont.addNewDoc},
  {path: '/logs/{user}', method: 'GET', config: logCont.fetchDoc}
];

server.route(routes);


server.start(function(){
  console.log('Go to localhost:8080/');
});



module.exports = server;
