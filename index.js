var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');

var server = Hapi.createServer('localhost', 8080 || server.info.port, options);

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
    path: path.join(__dirname + '/templates'),
    engines: {
      html: require('handlebars')
    },
    helpersPath: path.join(__dirname, 'happyhelper')
  }
};

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

var allLogs = function(req, reply) {
  reply(createdLogs);
};

var getLogs = function(req, reply) {
  reply(createdLogs[req.params.id]);
};

var addLogs = {
  handler: function(req, reply) {
  var newLog = {
    MuscleGroup: req.payload.MuscleGroup,
    'Date': req.payload.Date,
    Exercise: req.payload.Exercise
  };
  createdLogs.push(newLog);
  reply(newLog);
  },
  validate: {
    payload: {
      MuscleGroup: Joi.string().required(),
      'Date': Joi.string().required(),
      Exercise: Joi.string().required()
    }
  }
};

var routes = [
//set and store routes in array for code readability

//get path to styles folder
  /*{path: '/styles/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + '/styles')//join current directory root folder with path to styles folder to get styles
      }
    }
  },

//get path to images folder
  {path: '/public/{filename*}', method: 'GET', handler: {
    directory: {
      path: path.join(__dirname + '/public')
      }
    }
  },

//get path to scripts folder
  {path: '/scripts/{filename*}', method: 'GET', hanlder: {
    directory: {
      path: path.join(__dirname + '/scripts')
      }
    }
  }
*/
//set routes to html files

//set home.html as main page
  {path: '/', method: 'GET', handler: {file: 'home.html'}},
//go to cached logs page
  {path: '/yourlogs/', method: 'GET', handler: allLogs},
//set user home page
  {path: '/yourlogs/{id?}', method: 'GET', handler: getLogs},
//set path to add logs
  {path: '/newlog', method: 'POST', config: addLogs}
];

server.route(routes);

server.start(function(){
  console.log('Go to localhost:8080/');
});
