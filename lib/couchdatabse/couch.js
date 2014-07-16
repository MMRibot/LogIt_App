var nano = require('nano')('http://localhost:5984');
var db_name = 'logs';
var db = nano.use(db_name);

var getAllLogs = nano.db.get('logs', function(err, body) {
  if (!err) {
    console.log(body);
  }
});
