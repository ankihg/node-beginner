// var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

exports.start = function(response, request) {
  console.log('Request handler for start called');

  /*exec('ls -lah', function(error, stdout, stderr) {
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write(stdout);
    response.end();
  });*/


  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" '+
  'content="text/html; charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="upload">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {'Content-Type':'text/html'});
  response.write(body);
  response.end();


}

exports.upload = function(response, request) {
  console.log('Request handler for upload called');

  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, function(error, fields, files) {
    console.log('parsing complete');
    fs.rename(files.upload.path, '/tmp/test.png', function(error) {
      if (error) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });

    response.writeHead(200, {'Content-Type':'text/html'});
    response.write('received image:<br/>');
    response.write("<img src='/show' />");
    response.end();
  });

  // response.writeHead(200, {'Content-Type':'text/plain'});
  // response.write('youve sent '+querystring.parse(postData).text);
  // response.end();
};

exports.show = function(response) {
  console.log('Request handler for show called');
  response.writeHead(200, {'Content-Type':'image/png'});
  fs.createReadStream('/tmp/test.png').pipe(response);
}
