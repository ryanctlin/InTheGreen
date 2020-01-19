//Header adjust
$(document).ready(function () {
	$('.header').height($(window).height());
})

//navbar scroll
$(".navbar a").click(function () {
	$("body,html").animate({
		scrollTop: $("#" + $(this).data('value')).offset().top - 50
	}, 1000)
	$('.navbar-collapse').collapse('toggle');

})

//Skillbar Animation
jQuery(document).ready(function () {
	jQuery('.skillbar').each(function () {
		jQuery(this).find('.skillbar-bar').animate({
			width: jQuery(this).attr('data-percent')
		}, 6000);
	});
});

function getStatsDemo(rating) {
	//fetch data for esg stats
	if(rating >= 74){
		level=4;
	}else if(rating>=50 && rating<75){
		level=3;
	}else if(rating>=25 && rating<50){
		level=2;
	}else{
		level=1;
	}
	bar.animate(rating/100);
	//update tree image
	document.getElementById("tree-img").src = "images/stage-".concat(level.toString(),"-tree.png");
}
//UPDATE STATS
async function getStats() {
	//fetch data for esg stats
	var level=1;
	var rating;
	await fetch('https://sustainstocks.azurewebsites.net/api/v1/get_esg_average')
		.then(function (response) {
			return response.text();
		}).then(function (text) {
			rating = parseFloat(text);
		});
	if(rating >= 74){
		level=4;
	}else if(rating>=50 && rating<75){
		level=3;
	}else if(rating>=25 && rating<50){
		level=2;
	}else{
		level=1;
	}
	bar.animate(rating/100);
	//update tree image
	document.getElementById("tree-img").src = "images/stage-".concat(level.toString(),"-tree.png");
	//update bar value and animate
	bar.value()=90;
	bar.animate(bar.value()/100);
}

async function Update() {
	//fetch data for esg stats
	var level=1;
	var rating;
	await fetch('https://sustainstocks.azurewebsites.net/api/v1/update')
		.then(function (response) {
			return response.text();
		}).then(function (text) {
			console.log(text); // Print text
		});
}

//Semi Circle Bar animation
var bar = new ProgressBar.SemiCircle('#rating-bar', {
	strokeWidth: 10,
	color: 'red',
	trailColor: '#eee',
	trailWidth: 10,
	easing: 'easeInOut',
	duration: 1400,
	svgStyle: null,
	text: {
		value: '',
		alignToBottom: false
	},
	from: { color: '#cc0000' },
    to: { color: '#59b300'},

	// Set default step function for all animate calls
	step: (state, bar) => {
		bar.path.setAttribute('stroke', state.color);
		var value = Math.round(bar.value() * 100);
		if (value === 0) {
			bar.setText('');
		} else {
			bar.setText("Rating:"+value.toString());
		}

		bar.text.style.color = state.color;
	}
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '1.5rem';

bar.animate(1);  // Number from 0.0 to 1.0


var i = 0;                     //  set your counter to 1
function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      getStatsDemo(i);          //  your code here
      i+=15;                     //  increment the counter
      if (i < 90) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 2000)
}

myLoop();
//setInterval(getStatsDemo(50),1000);
//setInterval(StatsDemo,2000);
//setTimeout(Update, 1000);