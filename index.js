var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var cradle = require('cradle'); //we require the cradle framework that works with couchdb
var db = new(cradle.Connection)().database('logs'); //set a connection to our database by passing the name of our databse as the only argument to
                                                    //database(). Cradle takes care of the rest for us!

var server = Hapi.createServer('localhost', 8080, options);

//set options for server
var options = {
  cache: {
    engines: require('catbox-redis'),
    options: {
      host: 'localhost',
      partition: 'LogIt',
      password: 'password'
    }
  },

  views:  {
    path: path.join(__dirname + './lib/templates'),
    engines: {
      html: require('handlebars')
    },
    helpersPath: path.join(__dirname, 'happyhelper')
  }
};

//Here we assign our function to getAllLogs for later use. This function will get our database and display it.


var cache = server.cache('createdLogs', { expiresIn:60*60*1000 });

var createdLogs = [
  {
    MuscleGroup: 'Arms',
    'Date': '12-08-2014',
    Exercise: 'Bicep curl'
  },
  {
    MuscleGroup: 'Legs',
    'Date': '11-08-214',
    Exercise: 'Leg Press'
    }
];
//create a place to store all our functions. This will make maintainability easier
var logController = { };

//This function will fetch specific logs according to the params id passed
logController.allLogs = function (req , reply) {
  var id = req.params.id;

      if(typeof id === 'undefined') {
          db.get( '_all_docs' , function (err , doc){
            if(err) {
              console.dir(err);
              return reply(err);
            } else {
          // console.log(doc);
              return reply(doc);
            }
          });
      }
};

//This function gets the chosen log according to log id
logController.chooseLogs = function (req , reply) {
  var id = req.params.id;
  console.dir(req.params);


    db.head(id , function (err , opt1, opt2 ) {
      if(err) {
        console.log( 'This error: ' + err);
        return err;
      }

      if(opt2 !== '404' && id!=='undefined') {
        db.get(id , function (err, doc) {
           if(err) {
             console.log ( 'Error: ' + err );
             return reply( Hapi.error.notFound ('Document not found!'));
             } else {
               // console.log(doc);
                 return reply(doc);
             }
         });
       }
   });
};

//This fucntion will create a newLog and then add it with the push method to
//createdLogs. We also validate with Joi that the input data is of the correct type
logController.addLogs = {
  handler: function(req, reply) {
  var newLog = { //create a new log
    MuscleGroup: req.payload.MuscleGroup,
    'Date': req.payload.Date,
    Exercise: req.payload.Exercise
  };
  createdLogs.push(newLog); //add the newly created log to our list of already existing logs
  reply(newLog); //display the newly created log
  },
  validate: { //validate the input. It MUST HAVE ( required! ) three key/value pairs and each value must be a string.
    payload: {
      MuscleGroup: Joi.string().required(),
      'Date': Joi.string().required(),
      Exercise: Joi.string().required()
    }
  }
};

//This function will delete a specified log from createdLogs with the slice method
//If the selected log is not found, it will display a message informing that there is no log.
logController.deleteLog = {
  handler: function(req, reply) {
    var id = Number(req.params.id);
    if ( id >= createdLogs.length || typeof id === 'undefined') { //we will display a 404 message if id is greater than our logs
                                                                  // length(can't delete what doesn't exist) OR if it is undefined
      console.log("------->>> delete req.params.id: " + req.params.id + " | id: " + id);
      return reply('No Logs found!').code(404);
    }
      createdLogs.splice(id, 1); //if the above condition is false, then we will delete the selected log from our list
      console.log('--------> New creadtedLogs: ' + createdLogs.toString());
      return reply(true);
    },
    validate: {
        params: { id:Joi.string().alphanum()} // make sure that our requested id is a string of the alphanumerical type with validation
    }
  };


var routes = [
//set and store routes in array for code readability

//get path to styles folder
  /*{path: '/styles/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + './lib/styles')//join current directory root folder with path to styles folder to get styles
      }
    }
  },

//get path to images folder
  {path: '/public/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + './lib/public')
      }
    }
  },

//get path to scripts folder
  {path: '/scripts/{filename*}', method: 'GET', hanlder: {
    directory: {
      path: path.join(__dirname + './lib/scripts')
      }
    }
  }
*/
//set routes to html files

//set home.html as main page
  {path: '/', method: 'GET', handler: {file: './lib/html/home.html'}},
//get all Logs
  {path: '/yourlogs/', method: 'GET', handler: logController.allLogs},
//choose logs from databse
  {path: '/yourlogs/{id}', method: 'GET', handler: logController.chooseLogs},
//set path to add logs
  {path: '/newlog', method: 'POST', config: logController.addLogs},
//set the path to delete logs
  {path: '/yourlogs/deletelog/{id}', method: 'DELETE', config: logController.deleteLog}
];

server.route(routes);


server.start(function(){
  console.log('Go to localhost:8080/');
});

server.createdLogs = createdLogs;//export creastedLogs to the test.js file in the test folder
module.exports = server;
