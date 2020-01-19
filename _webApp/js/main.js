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

	// Set default step function for all animate calls
	step: (state, bar) => {
		bar.path.setAttribute('stroke', state.color);
		var value = Math.round(bar.value() * 100);
		if (value === 0) {
			bar.setText('');
		} else {
			bar.setText("Rating");
		}

		bar.text.style.color = state.color;
	}
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '1.5rem';

bar.animate(0.45);  // Number from 0.0 to 1.0

