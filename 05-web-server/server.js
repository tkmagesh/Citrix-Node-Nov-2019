var http = require('http');

// req : IncomingMessage -> ReadableStream
// res : ServerResponse -> WritableStream
var server = http.createServer(function(req, res){
    res.write('<h1>Welcome to Node.js</h1>');
    res.end();
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on port 8080!!');
});