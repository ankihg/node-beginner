var server = require(__dirname + '/server.js');
var router = require(__dirname + '/router.js');

server.start(router.route);
