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

//Modal Load

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var remoteData = button.data('remote'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
	modal.find('.modal-body').load(remoteData);
	console.log(remoteData);
});
