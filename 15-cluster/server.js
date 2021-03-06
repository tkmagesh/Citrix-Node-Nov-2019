var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log("# of cpus -> ", numCPUs);

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  console.log(`${process.pid} instantiated`);
  http.createServer(function(req, res) {
    console.log(`${process.pid} serving the request` );
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
