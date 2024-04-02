$(document).ready(function () {

function setImage() {
		const images = document.querySelectorAll("container-right img");
		images.forEach((element) => {
			const width = element.naturalWidth;
			const height = element.naturalHeight;

			if (height > width) {
				element.height = "80%";
			} else if (height === width) {
				element.height = "40%";
			} else {
				element.height = "60%";
			}
		});
}
setImage();

$('button:contains("activities")').on('click', function() {
	window.location.href = 'landing_page.html';
});

$('.card-landing').on('click', function(index, element) {
	window.location.href = `activity${$(this).data('activity')}.html`;
});

});