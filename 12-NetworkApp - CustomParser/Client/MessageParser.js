var EventEmitter = require("events").EventEmitter;

class MessageParser extends EventEmitter{
    constructor(socket){
        socket.setEncoding("utf8");
        var buffer = '';
        socket.on("data",  (chunk) => {
            buffer = buffer + chunk;
            while (buffer.indexOf("\n") !== -1) {
                var msg = buffer.substr(0, buffer.indexOf("\n"));
                buffer = buffer.substr(buffer.indexOf("\n") + 1);
                var response = JSON.parse(msg);
                this.emit(response.type, response.filename);
            }
        });
        socket.on("close",  () => {
            this.emit("close");
        });
        socket.on("error",  (err) => {
            this.emit("error", err);
        });
    }
}

module.exports = MessageParser;
