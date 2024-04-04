$(document).ready(function () {


$('button:contains("activities")').on('click', function() {
	window.location.href = 'landing_page.html';
});

$('.card-landing').on('click', function(index, element) {
	window.location.href = `activity${$(this).data('activity')}.html`;
});

});

$(window).on('load', function() {
	function setImage() {
		const images = document.querySelectorAll(".container-right img");
		images.forEach((element) => {
			const width = element.naturalWidth;
			const height = element.naturalHeight;

			const ration = height/width;
			if (height/width >= 1.5) {
				element.style.height = "90%";
			} else if (height === width) {
				element.style.height = "40%";
			} else {
				if (width/height >= 1.8) {
					element.style.height = "60%";
				} else {
					element.style.height = "80%";
				}
			}
		});
	}

	setImage();

	function setMemoryImages() {
		const images = document.querySelectorAll(".memory-container img");

		images.forEach((element) => {
			const image_width = $(element).width();
			const card_width = $(element).parent().width();

			// const height = element.naturalHeight;

			const ratio = image_width/card_width;
			if (ratio > 0.8) {
				$(element).width(0.8*card_width);
				$(element).height('auto');
			} 
		});
	}

	setMemoryImages();
});

// 