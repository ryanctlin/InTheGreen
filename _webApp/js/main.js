//Header adjust
$(document).ready(function () {
	$('.header').height($(window).height());
})

//navbar scroll
$(".navbar a").click(function () {
	$("body,html").animate({
		scrollTop: $("#" + $(this).data('value')).offset().top
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

//Change image
// function getStats() {  
// 	//fetch data
// 	var level;
// 	const response = await fetch('http://example.com/movies.json');
// 	if(response >= 75){
// 		level=4
// 	}else if(response>=50 && response<75){
// 		level=3;
// 	}else if(response>=25 && response<50){
// 		level=2;
// 	}else{
// 		level=1
// 	}
// 	document.getElementById("tree-img").src = "images/stage-".concat(level.toString(),"-tree.png");
// 	console.log(imageNo);
// }
//setTimeout(getStats, 1000);
