var ipStatus = {};

exports.unlockIp = function (ip) {
	console.log("Ip " + ip + " wait to be unlocked.");
	ipStatus[ip] = true;
}

exports.checkStatus = function () {
	console.log("This check funciton is called.");
	for (key in ipStatus) {
		console.log("Ip " + key + ": " + ipStatus[key]);
	}
}

exports.ip = ipStatus;