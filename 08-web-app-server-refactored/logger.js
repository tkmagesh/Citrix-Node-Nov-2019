var chalk = require('chalk');

module.exports = function(req, res, next){
    var logMessage = chalk.cyanBright(req.method) + '\t' + req.urlObj.pathname;
    var start = new Date();
    res.on('finish', function(){
        var end = new Date(),
            elapsed = end - start;
        logMessage += '\t' + chalk.red(res.statusCode) + '\t' + chalk.greenBright(elapsed) + 'ms';
        console.log(logMessage);
    });
    next();
}