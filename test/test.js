var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment

//name our test units
Lab.experiment("Basic All Log Tests", function(){
    //define the tests
    Lab.test("Main endpoint list all logs at url /yourlogs/", function(done){
      var options = {
        method: 'GET',
        url: '/yourlogs/'
      };
      //server.inject lets you simulate an http request
      server.inject(options, function(response) {
        Lab.expect(response.statusCode).to.equal(200);//Expect http response status code to be 200('OK')
        Lab.expect(response.result).to.have.length(2);
        Lab.expect(response.result).to.deep.equal(server.createdLogs);
      done();
      });
    });

  //define tests
  Lab.test('List Logs by id', function(done){
    var options = {
      method: 'GET',
      url: '/yourlogs/0'
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(200);
    done();
    });
  });

  //define tests
  Lab.test('List Logs by id', function(done){
    var options = {
      method: 'GET',
      url: '/yourlogs/4'
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(404);
    done();
    });
  });

  Lab.test('Create new log', function(done){
    var options = {
      method: 'POST',
      url: '/newlog',
      payload: {
        MuscleGroup: 'Chest',
        'Date': '22-11-2222',
        Exercise: "Inclined Press"
      }
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(response.result).to.deep.equal({MuscleGroup: 'Chest','Date': '22-11-2222',Exercise: "Inclined Press"});
      Lab.expect(response.result).to.not.equal({MuscleGroup: 'Chest','Date': '22-11-2222'});
    done();
    });
  });

  Lab.test('Delete log', function(done){
    var options = {
      method: 'DELETE',
      url: '/yourlogs/deletelog/1',
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(response.result).to.deep.equal(true);
      Lab.expect(response.result).to.not.equal({MuscleGroup: 'Arms','Date': '12-08-2014',Exercise: 'Bicep curl'},{MuscleGroup: 'Legs','Date': '11-08-214',Exercise: 'Leg Press'});
    done();
    });
  });

  Lab.test('Delete log', function(done){
    var options = {
      method: 'DELETE',
      url: '/yourlogs/deletelog/6',
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(404);
      Lab.expect(response.result).to.equal('No Logs found!');
    done();
    });
  });


});
