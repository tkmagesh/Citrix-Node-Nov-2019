var http = require('http'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    serve404 = require('./serve404');

var _middlewares = [ dataParser, serveStatic, serveCalculator, serve404 ];

function  exec(req, res, fns) {
    var first = fns[0],
        remaining = fns.slice(1),
        next = function(){
            exec(req, res, remaining);
        };
    if (typeof first === 'function')
        first(req, res, next);
}

var server = http.createServer(function(req, res){
    exec(req, res, _middlewares);
});

server.listen(8080);

server.on('listening', function(){
    console.log('webapp server listening on port 8080!!');
});