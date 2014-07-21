var Lab = require('lab'); //require the lab module
var server = require('../'); //require index.js
//write individual tests for your functions with Lab.experiment

//name our test units
Lab.experiment("Basic All Log Tests", function(){
    //define the tests
    Lab.test("List all logs at url /yourlogs/", function(done){
      var options = {
        method: 'GET',
        url: '/yourlogs/'
      };
      //server.inject lets you simulate an http request
      server.inject(options, function(response) {
        Lab.expect(response.statusCode).to.equal(200);//Expect http response status code to be 200('OK')
        Lab.expect(response.result).to.be.an('array');
      done();
      });
    });

  //define tests
  Lab.test("List all logs at url /yourlogs/ - Error", function(done){
    var options = {
      method: 'GET',
      url: '/yourlogs'
    };
    //server.inject lets you simulate an http request
    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(404);//Expect http response status code to be 400
    done();
    });
  });


  //define logs by id
  Lab.test('List Logs by id', function(done){
    var options = {
      method: 'GET',
      url: '/yourlogs/Back'
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(200);
    done();
    });
  });

  Lab.test('List Logs by id - Error', function(done){
    var options = {
      method: 'GET',
      url: '/yourlogs/foozball'
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(404);
      Lab.expect(response.result.message).to.equal('Document not found!');
    done();
    });
  });


//tests to verify existence of databse
/*    Lab.test('Existence of databse', function(done){
    var options = {
      method: 'GET',
      url: '/logs/'
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(200);
    done();
    });
  });

  Lab.test('Existence of databse - Error', function(done){
    var options = {
      method: 'GET',
      url: '/bumbigana/'
    };

    server.inject(options, function(response) {
      Lab.expect(response.statusCode).to.equal(404);
      Lab.expect(response.result.message).to.equal('Database bumbigana does not exist!');
    done();
    });
  });
*/

//tests for creation of new docs in db
  Lab.test('Create new log', function(done){
    var date = new Date().toString();
    var options = {
      method: 'POST',
      url: '/yourlogs/newlog',
      payload: {
        MuscleGroup: 'Chest',
        'Date': date,
        Exercise: "Inclined Press",
        Set1: {Reps:12, Kg:99},
        Set2: {Reps:42, Kg:21},
        Set3: {Reps:22, Kg:33}
      }
    };

    server.inject(options, function(response) {
      //Lab.expect(response.statusCode).to.equal(201);
      Lab.expect(response.result).to.equal({"ok": true});
      Lab.expect(response.result).to.not.equal({MuscleGroup: 'Chest','Date': '22-11-2222'});
    done();
    });
  });


//tests for deletion of docs
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
