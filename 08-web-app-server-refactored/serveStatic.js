var path = require('path'),
    fs = require('fs');
    
var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource) {
    return staticExtns.indexOf(path.extname(resource)) >= 0;
}

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)) {
            return next();
        }
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
        stream.on('end', function(){
            next();
        });
       /*  stream.on('data', function(chunk){
            console.log('[@serveStatic] serving file chunk');
            res.write(chunk);
        });
        stream.on('close', function(){
            console.log('[@serveStatic] closing the response');
            res.end();
            next();
        }); */
    } else {
        next();
    }
};
