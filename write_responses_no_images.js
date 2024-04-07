$(document).ready(async function () {

    // const data = {

    // }
    $('.volume-blue').on('click', function() {
        console.log('asdasdd');
        let x = 'emily and will'
        playSound(`./audio/pronouns/story/${localStorage.getItem('age')}/${localStorage.getItem('activity')}/${$(this).parent().text().toLowerCase().trim().replaceAll(' ', '_')}.mp3`);
        // playSound(`./audio/pronouns/story/${localStorage.getItem('age')}/${localStorage.getItem('activity')}/${x}.mp3`);
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