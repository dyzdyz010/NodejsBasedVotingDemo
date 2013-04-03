var fs = require("fs");
var querystring = require("querystring");
var ip = require("./ip.js");

function start(request, response, postData) {
	fs.readFile('./index.html', function (err, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function upload(request, response, postData) {
	console.log("Request handler 'upload' was called.");
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent " + postData);
	response.end();
}

function submit(request, response, postData) {
	console.log("Request from " + request.connection.remoteAddress + " received.");
	//console.log("Request handler 'submit' was called.");
	//console.log("Recieved coming data: " + querystring.parse(postData).data + ".");
	ip.checkStatus();
	var addr = request.connection.remoteAddress;
	//console.log(ip.ip[addr]);
	
	if (ip.ip[addr] == false) {
		response.writeHead(403);
		response.end();
		return;
	}
	ip.ip[addr] = false;
	setTimeout(ip.unlockIp, 60000, [addr]);
	
	var originData = {};
	fs.readFile('./results.txt', function (err, data) {
		console.log("Original file data got: " + data + ".");
		if (!err && data != "") {
			originData = JSON.parse(data);
		}
		console.log("Coming data: " + postData);
		var str = querystring.parse(postData).data;
		console.log("string: " + str);
		var comingData = JSON.parse(str);
		for (key in comingData) {
			if (comingData[key] === true) {
				if (originData[key]) {
					originData[key] += 1;
				} else {
					console.log("Key " + key + " doesn't exist.");
					originData[key] = 1;
				}
			}
		}
		var originString = JSON.stringify(originData);
		console.log("originString: " + originString);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(originString);
		response.end();
		fs.writeFile('./results.txt', originString, function (err) {
			if (err) throw err;
		});
	});
}

function load(request, response, postData) {
	fs.readFile('./results.txt', function (err, data) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(data);
		response.end();
	});
}

exports.start = start;
exports.upload = upload;
exports.submit = submit;
exports.load = load;