var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

// req : IncomingMessage -> ReadableStream
// res : ServerResponse -> WritableStream
var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url),
        resourceName = urlObj.pathname,
        resourceFullName = path.join(__dirname, resourceName);
    console.log(resourceName);
    if (!fs.existsSync(resourceFullName)){
        res.statusCode = 404;
        res.end();
        return;
    }
    var stream = fs.createReadStream(resourceFullName);
    stream.pipe(res);
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on port 8080!!');
});