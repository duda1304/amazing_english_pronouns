$(document).ready(function () {

	$('button:contains("activities")').on('click', function() {
		window.location.href = 'index.html';
	});

	$('.card-landing').on('click', function(index, element) {
		window.location.href = `activity${$(this).data('activity')}.html`;
	});

	$('.instruction-en').append(`<span><img class="audio-icon" src="./media/audio_icon.svg"></span>`)

	$('.container-left img').on('click', function() {
		const fileNameParts = $(this).attr('src').split('_');
		const audioSrc = fileNameParts[fileNameParts.length -1].split('.')[0].toLowerCase();
		playSound(`./audio/pronouns/pronouns/${audioSrc}.mp3`);
	});

	$('.instruction-en').css('cursor', 'pointer');
	$('.instruction-en').on('click', function() {
		playSound(description[key]['audio']);
	});


	function playSound(src) {
		if ($('audio').length === 0) {
			$('main').append('<audio type="audio/mpeg"></audio>');
		}
		if (!e) var e = window.event;
		if (e) e.stopPropagation();
		$('audio')[0].pause();
		$('audio').attr('src', src);
		$('audio')[0].play();
	}
	
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

// .audio-icon {
//     width: max(1vw, 14px);
//     height: max(1vw, 14px);
//     background-image: url(./img/audio_icon.svg);
//     background-size: contain;
//     background-repeat: no-repeat;
// }

