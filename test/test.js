var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment
var couchbase = require('couchbase').Mock;
var db = new couchbase.Connection();


//name our test units
Lab.experiment("LogIt Tests", function(){
    //define the tests

    Lab.before(function(done){
      db.set("persons", {"FirstName": "Mario"}, function(result){
        return result;
      });
      setTimeout(function () { done(); } , 1000);
    });


    Lab.test("Create User", function(done){
      var options = {
        method: 'POST',
        url: '/userCreator'
      };
      //server.inject lets you simulate an http request
      //For our first test we do not have any documents in the databse.
      server.inject(options, function(response) {
        Lab.expect(response.statusCode).to.equal(201);//Expect http response status code to be 404(Not Found)
        //Lab.expect(response.result.value).to.equal(undefined);//there is no collection at the time
      done();
      });
    });



});
