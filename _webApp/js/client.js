function getStats() {
	//fetch data
	var level;
	const response = fetch('https://sustainstocks.azurewebsites.net/api/v1/get_esg_average');
	console.log(response)
	if(response >= 75){
		level=4;
	}else if(response>=50 && response<75){
		level=3;
	}else if(response>=25 && response<50){
		level=2;
	}else{
		level=1;
	}
	document.getElementById("tree-img").src = "images/stage-".concat(level.toString(),"-tree.png");
	console.log(imageNo);
	document.getElementById("rating-percentage").data-percent = "".concat(response.toString(),"%");
	document.getElementById("rating-percentage-text").data-percent = "".concat(response.toString(),"/100");
}

setInterval(getStats, 1000);