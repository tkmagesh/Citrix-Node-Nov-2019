var http = require('http'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    serve404 = require('./serve404');

var server = http.createServer(function(req, res){
    dataParser(req);
    console.log(req.method + '\t' + req.urlObj.pathname);
    serveStatic(req, res);
    serveCalculator(req,res);
    serve404(res);
});

server.listen(8080);

server.on('listening', function(){
    console.log('webapp server listening on port 8080!!');
});