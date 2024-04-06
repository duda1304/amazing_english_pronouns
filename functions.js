$(document).ready(function () {

	$('button:contains("activities")').on('click', function() {
		window.location.href = 'index.html';
	});

	$('.card-landing').on('click', function(index, element) {
		window.location.href = `activity${$(this).data('activity')}.html`;
	});

});

$(".container-right img").on('load', function() {
	const width = this.naturalWidth;
	const height = this.naturalHeight;

	if (height/width >= 1.5) {
		this.style.height = "90%";
	} else if (height === width) {
		this.style.height = "40%";
	} else {
		if (width/height >= 1.5) {
			this.style.height = "40%";
		} else if (width/height >= 1.2) {
			this.style.height = "60%";
		} else {
			this.style.height = "80%";
		}
	}
});

