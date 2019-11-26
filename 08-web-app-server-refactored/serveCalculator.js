var calculator = require('./calculator');
    
module.exports = function(req, res, next){
    if (req.urlObj.pathname === '/calculator') {
        var data = req.method === 'GET' ? req.queryData : req.bodyData;
        var x = parseInt(data.x),
            y = parseInt(data.y),
            op = data.op;
        var result = calculator[op](x, y);
        res.write(result.toString());
        res.end();
        next();
    } else {
        next();
    }
};