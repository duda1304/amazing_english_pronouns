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

// $(".memory-container img").on('load', function() {
// 	const image_width = $(this).width();
// 	const image_height = $(this).height();

// 	const card_width = $(this).parent().width();
// 	const card_height = $(this).parent().height();

// 	const image_ratio = image_width/image_height;

// 	const adjusted_height = 0.8*card_height;

// 	if (image_ratio*adjusted_height > 0.9*card_width) {
// 		$(this).width(0.9*card_width);
// 		$(this).height('auto');
// 	} else {
// 		$(this).height(0.9*card_height);
// 		$(this).width('auto');
// 	}

// 	// const image_width = $(this).width();
// 	// const card_width = $(this).parent().width();

// 	// // const height = element.naturalHeight;

// 	// const ratio = image_width/card_width;
// 	// if (ratio > 0.8) {
// 	// 	$(this).width(0.8*card_width);
// 	// 	$(this).height('auto');
// 	// } 
// })

// $(window).on('load', function() {
// 	function setImage() {
// 		const images = document.querySelectorAll(".container-right img");
// 		images.forEach((element) => {
// 			const width = element.naturalWidth;
// 			const height = element.naturalHeight;

// 			const ration = height/width;
// 			if (height/width >= 1.5) {
// 				element.style.height = "90%";
// 			} else if (height === width) {
// 				element.style.height = "40%";
// 			} else {
// 				if (width/height >= 1.8) {
// 					element.style.height = "60%";
// 				} else {
// 					element.style.height = "80%";
// 				}
// 			}
// 		});
// 	}

// 	setImage();

	// function setMemoryImages() {
	// 	const images = document.querySelectorAll(".memory-container img");

	// 	images.forEach((element) => {
	// 		const image_width = $(element).width();
	// 		const card_width = $(element).parent().width();

	// 		// const height = element.naturalHeight;

	// 		const ratio = image_width/card_width;
	// 		if (ratio > 0.8) {
	// 			$(element).width(0.8*card_width);
	// 			$(element).height('auto');
	// 		} 
	// 	});
	// }

// 	setMemoryImages();
// });

