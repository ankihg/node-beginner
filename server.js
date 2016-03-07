var http = require('http');
var url = require('url');

function start(route, handle) {
  http.createServer(function(request, response) {
    var postData = '';
    var pathname = url.parse(request.url).pathname;

    console.log('Request for ' + pathname + ' received.');

    request.setEncoding('utf-8');

    request.addListener('data', function(postDataChuck) {
      postData += postDataChuck;
      console.log('recieved post data chunk: '+postDataChuck);
    });

    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });

    // route(handle, pathname, response);

  }).listen(8888);

  console.log('Server has started.');
}

exports.start = start;
