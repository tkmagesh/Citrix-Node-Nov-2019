var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    querystring = require('querystring'),
    url = require('url'),
    calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource){
    return staticExtns.indexOf(path.extname(resource)) >= 0;
}

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url),
        resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
    console.log(req.method + '\t' + urlObj.pathname);
    if (isStatic(resourceName)){
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
    } else if (resourceName === '/calculator'){
        if (req.method === 'GET') {
            var queryData = querystring.parse(urlObj.query),
                x = parseInt(queryData.x),
                y = parseInt(queryData.y),
                op = queryData.op;
            var result = calculator[op](x, y);
            res.write(result.toString());
            res.end();
        } else {
            var rawData = '';
            req.on('data', function (chunk) {
                rawData += chunk;
            });
            req.on('end', function () {
                var bodyData = querystring.parse(rawData),
                    x = parseInt(bodyData.x),
                    y = parseInt(bodyData.y),
                    op = bodyData.op;
                var result = calculator[op](x, y);
                res.write(result.toString());
                res.end();
            });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', function(){
    console.log('webapp server listening on port 8080!!');
});