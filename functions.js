$(document).ready(async function () {

	////// TEMP CODE
	$('.temp-buttons button').on('click', function() {
		localStorage.setItem('age', $(this).data('age'));
		$(this).removeClass('btn-secondary');
		$(this).addClass('btn-primary');
		$(`.temp-buttons button:not([data-age="${$(this).data('age')}"])`).removeClass('btn-primary');
		$(`.temp-buttons button:not([data-age="${$(this).data('age')}"])`).addClass('btn-secondary');
	});

	//////


	// const data = await fetch(`./data/data.json`).then(response => response.json());
	const data = {
		"1" : {
			"activity1" : "select_answer",
			"activity2" : "memory",
			"activity3" : "correct_incorrect",
			"activity4" : "drag_and_drop"
		},
		"2" : {
			"activity1" : "correct_incorrect",
			"activity2" : "memory",
			"activity3" : "secret_code",
			"activity4" : "write_responses_no_images"
		},
		"3" : {
			"activity1" : "secret_code",
			"activity2" : "memory",
			"activity3" : "write_responses_with_images",
			"activity4" : "write_responses_no_images"
		}
	}
	console.log(data);

	if (window.location.href.includes('index.html')) {
		$('.temp-buttons button[data-age="1"]').click();
		localStorage.removeItem('activity');
	}
	if (window.location.href.includes('game.html') && localStorage.getItem('age') !== null && localStorage.getItem('activity') !== null) {
		const template = await fetch(`${data[localStorage.getItem('age')][localStorage.getItem('activity')]}.html`).then(response => response.text());
		$('body').append(`<script src="${data[localStorage.getItem('age')][localStorage.getItem('activity')]}.js"></script>`);
		$('body').append(template);
		
	} else {
		if (window.location.href.includes('game.html')) {
			window.location.href = 'index.html';
		}
	}
	$('button:contains("activities")').on('click', function() {
		window.location.href = 'index.html';
	});

	$('.card-landing').on('click', function(index, element) {
		localStorage.setItem('activity', `activity${$(this).data("activity")}`);
		window.location.href = 'game.html';
		// window.location.href = `activity${$(this).data('activity')}.html`;
	});

	$('.instruction-en').append(`<span><img class="audio-icon" src="./media/audio_icon.svg"></span>`)

	$('.container-left img').on('click', function() {
		const fileNameParts = $(this).attr('src').split('_');
		const audioSrc = fileNameParts[fileNameParts.length -1].split('.')[0].toLowerCase();
		playSound(`./audio/pronouns/pronouns/${audioSrc}.mp3`);
	});

	$('.instruction-en').css('cursor', 'pointer');
	$('.instruction-en').on('click', function() {
		// playSound(description[key]['audio']);
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

// $(".container-right img").on('load', function() {
// 	const width = this.naturalWidth;
// 	const height = this.naturalHeight;

// 	if (height/width >= 1.5) {
// 		this.style.height = "90%";
// 	} else if (height === width) {
// 		this.style.height = "40%";
// 	} else {
// 		if (width/height >= 1.5) {
// 			this.style.height = "40%";
// 		} else if (width/height >= 1.2) {
// 			this.style.height = "60%";
// 		} else {
// 			this.style.height = "80%";
// 		}
// 	}
// });

// .audio-icon {
//     width: max(1vw, 14px);
//     height: max(1vw, 14px);
//     background-image: url(./img/audio_icon.svg);
//     background-size: contain;
//     background-repeat: no-repeat;
// }

