var server = require("./server.js");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/submit"] = requestHandlers.submit;
handle["/load"] = requestHandlers.load;

server.start(router.route, handle);