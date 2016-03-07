var exec = require('child_process').exec;

exports.start = function(response) {
  console.log('Request handler for start called');

  exec('ls -lah', function(error, stdout, stderr) {
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write(stdout);
    response.end();
  });
}

exports.upload = function(response) {
  console.log('Request handler for upload called');

  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write('hello upload');
  response.end();
};
