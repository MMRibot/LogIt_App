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

  
});
