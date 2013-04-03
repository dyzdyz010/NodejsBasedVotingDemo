var lanList = {};
var request = new XMLHttpRequest();
var baseUrl = "http://dyzdyz010.ap01.aws.af.cm";
//var baseUrl = "http://127.0.0.1:8888";
//var baseUrl = "http://duyizhuo.azurewebsites.net";

function beginLoad() {
	loadData();
	var intervalID = setInterval(loadData, 5000);
}

function loadData() {
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200)
		{
			console.log("Data recieved: " + request.responseText);
			drawPage(request.responseText)
		}
	};
	request.open("POST", baseUrl + "/load", true);
	request.send();
}

function validate() {
	request.onreadystatechange = function() {
		document.getElementById("status").innerHTML = request.responseText;
	}
	request.open("POST", baseUrl + "/stop", true);
	request.send();
}

function submit() {
	var checks = document.getElementById("checks").getElementsByTagName("input");
	for(var i = 0; i < checks.length; i++)
	{
		var box = checks[i];
		console.log(box.id);
		lanList[box.id] = box.checked;
	}
	console.log(lanList);
	
	var str = JSON.stringify(lanList);
	console.log(str);
	
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200)
		{
			console.log("Data recieved: " + request.responseText);
			drawPage(request.responseText)
		}
		if(request.readyState == 4 && request.status == 403)
		{
			alert("Don't submit so quick~");
		}
	};
	request.open("POST", baseUrl + "/submit", true);
	request.send("data=" + str);
}

function drawPage(data) {
	var comingData = JSON.parse(data);
	var personNum = 0;
	for(key in comingData)
	{
		personNum += comingData[key];
	}
	for(key in comingData)
	{
		document.getElementById(key + "-progress").style.width = (comingData[key] / personNum * 100).toString() + "%";
		console.log(key + ": " + (comingData[key] / personNum * 100).toString() + "%.");
	}
	document.getElementById("pNum").innerHTML = personNum + " participated."
}

