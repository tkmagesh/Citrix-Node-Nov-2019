var path = require('path'),
    fs = require('fs');
    
var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource) {
    return staticExtns.indexOf(path.extname(resource)) >= 0;
}

module.exports = function(req, res){
    var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
    }
};
