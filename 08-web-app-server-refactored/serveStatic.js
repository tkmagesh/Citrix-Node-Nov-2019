var path = require('path'),
    fs = require('fs');
    
var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource) {
    return staticExtns.indexOf(path.extname(resource)) >= 0;
}

module.exports = function(publicResourcePath){
    return function(req, res, next){
        var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
        if (isStatic(resourceName)) {
            var resourceFullName = path.join(publicResourcePath, resourceName);
            if (!fs.existsSync(resourceFullName)) {
                return next();
            }
            var stream = fs.createReadStream(resourceFullName);
            stream.pipe(res);
            stream.on('end', function(){
                next();
            });
        } else {
            next();
        }
    };
}
