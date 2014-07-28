var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment
var couchbase = require('couchbase').Mock;
var db = new couchbase.Connection();

//define the tests

Lab.experiment("CouchBase Tests", function() {
  // tests
  Lab.test("Set & Get a record", function(done) {
    db.set('personstest', {"FirstName":'Steve'}, function(err, result) {

      db.get('personstest', function(err, result) {

        Lab.expect(result.value.FirstName).to.equal('Steve');
        // console.log(result.value);
        done();
      });
    });
  });

  Lab.test("Landing page", function(done){
    var options = {
      url: '/',
      method: 'GET'
    };

    server.inject(options, function(response){
      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(response.result).to.have.length(52);
      done();
    });
  });

  Lab.test("Payload testing", function(done){
    var payload = {
      "personId": "Nuno",
      "Date": {"type": "date", "default": "Date.now"},
      "musclegroup": "Arms",
      "exercise": "Bicep Curl",
      "sets": [
        {"reps": "10", "Kg": "20"},
        {"reps": "11", "Kg": "30"}
      ]
    };
    db.set('workout1', payload, function(err, result) {
      db.get('workout1', function(err, result) {

        Lab.expect(result.value.sets[0].reps).to.equal("10");
        done();
      });
    });

  });


});
