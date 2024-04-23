$(document).ready(async function () {

    const data = {
        '2' : 
        {'activity4' : 
            [
                {
                    'my sister (ma soeur)': 'she',
                    'Tim': 'he',
                    'a boy (un garçon)': 'he',
                    'the school (l’école)': 'it',
                    'the cars (les voitures)': 'they',
                    'Emily and Will (Emily et Will)': 'they',
                    'his aunt (sa tante)': 'she',
                    'her bike (son vélo)': 'it',
                    'Chloe and I (Chloe et moi)': 'we',
                    'my father (mon père)': 'he'
                },
                {
                    'Ethan': 'he',
                    'my book (mon livre)': 'it',
                    'Christina': 'she',
                    'her pen (son stylo)': 'it',
                    'Kim and I (Kim et moi)': 'we',
                    'my brother (mon frère)': 'he',
                    'the television (la television)': 'it',
                    'John and Paul (John et Paul)': 'they',
                    'the nurse (l’infirmière)': 'she',
                    'the Mathematics exercises (les exercices de mathématiques)': 'they'
                },
                {
                    'the chocolate cake (le gâteau au chocolat)': 'it',
                    'my family and I (ma famille et moi)': 'we',
                    'Charlotte': 'she',
                    'the film (le film)': 'it',
                    'the children (les enfants)': 'they',
                    'the television (la télévision)': 'it',
                    'James': 'he',
                    'my son and his team (mon fils et son équipe)': 'they',
                    'her daughter (sa fille)': 'she',
                    'the cat (le chat)': 'it'
                },
                {
                    'your family and you (ta famille et toi)': 'you',
                    'the dress (la robe)': 'it',
                    'my classmate and I (ma camarade de classe et moi)': 'we',
                    'John, Peter and Kevin (John, Peter et Kevin)': 'they',
                    'the suitcase (la valise)': 'it',
                    'her husband (son mari)': 'he',
                    'the parrot and the dog (le perroquet et le chien)': 'they',
                    'my colleague and I (mon collègue et moi)': 'we',
                    'her students (ses étudiants)': 'they',
                    'a guinea pig (un cochon d’Inde)': 'it'
                }
            ]
        },
        '3' : 
        {'activity4' : 
            [
                {
                    'the building (l’immeuble)': 'it',
                    'Mary, Jessica and I (Mary, Jessica et moi)': 'we',
                    'your siblings (tes frères et soeurs)': 'they',
                    'your niece and you (tes nieces et toi)': 'you',
                    'the singer and his dancers (le chanteur et ses danseurs)': 'they',
                    'Olivia': 'she',
                    'France': 'it',
                    'my teammate and her parents (ma coéquipière et ses parents)': 'they',
                    'Michael': 'he',
                    'the snake (le serpent)': 'it'
                },
                {
                    'the father of her friend (le père de son ami)': 'he',
                    'the grandmother (la grand-mère)': 'she',
                    'his stepbrother (son demi-frère)': 'he',
                    'my English teacher and you (mon professeur d’anglais et moi)': 'you',
                    'the neighbours and I (les voisins et moi)': 'we',
                    'the armchair (le fauteuil)': 'it',
                    'his cousins and you (ses cousins et toi)': 'you',
                    'Chloe’s mother (la mère de Chloe)': 'she',
                    'their twin sister (sa soeur jumelle)': 'she',
                    'her nephew (son neveu)': 'he'
                },
                {
                    'my boots (mes bottes)': 'they',
                    'the frame (le cadre)': 'it',
                    'my uncle (mon oncle)': 'he',
                    'my teacher’s sister (la soeur de mon professeur)': 'she',
                    'the remote control (la télécommande)': 'it',
                    'my brother-in-law (mon beau-frère)': 'he',
                    'your children (tes enfants)': 'they',
                    'the flag (le drapeau)': 'it',
                    'your stepmother and you (ta belle-mère et toi)': 'you',
                    'his godmother (sa marraine)': 'she'
                },
                {
                    'the laptop (l’ordinateur portable)': 'it',
                    'my pupils (mes élèves)': 'they',
                    'the file (le dossier)': 'it',
                    'the waitress (la serveuse)': 'she',
                    'Alice and I (Alice et moi)': 'we',
                    'Dan and you (Dan et toi)': 'you',
                    'the bed (le lit)': 'it',
                    'my boyfriend (mon petit ami)': 'he',
                    'the firefighters (les pompiers)': 'they',
                    'the cooker (la gazinière)': 'it'
                }
            ]
        }
    }
   
    // 'my teacher’s sister (la soeur de mon professeur)': 'she', no audio
   

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

    function render() {
        let textData = data[localStorage.getItem('age')][localStorage.getItem('activity')].shift();
        let keys = Object.keys(textData);
        for (let i = 0; i < 5; i++) {
            $('.story').children(':first-child').append(`
            <div class="row mb-2">
                <div class="col-9 col-md-8 pe-1 pe-md-2">
                    <div class="english-479">${keys[i].split('(')[0].trim()} <i class="fas fa-volume-up volume-blue"></i></div>
                    <div class="french-479" style="${keys[i].split('(').length > 1 ? '' : 'color: transparent;'}">${keys[i].split('(').length > 1 ? '(' + keys[i].split('(')[1].trim() : 'placeholder'}</div>
                </div>
                <div class="col-3 col-md-4 p-0 p-md-2">
                    <input type="text" class="form-control d-inline-block btn-white-blue m-0 w-100" data-answer="${textData[keys[i]]}"></input>
                </div>
            </div>`)
        }
        for (let i = 5; i < 10; i++) {
            $('.story').children(':nth-child(2)').append(`
            <div class="row mb-2">
                <div class="col-9 col-md-8 pe-1 pe-md-2">
                    <div class="english-479">${keys[i].split('(')[0].trim()} <i class="fas fa-volume-up volume-blue"></i></div>
                    <div class="french-479">${keys[i].split('(').length > 1 ? '(' + keys[i].split('(')[1].trim() : ''}</div>
                </div>
                <div class="col-3 col-md-4 p-0 p-md-2">
                    <input type="text" class="form-control d-inline-block btn-white-blue m-0 w-100" data-answer="${textData[keys[i]]}"></input>
                </div>
            </div>`)
        }
        $('.volume-blue').on('click', function() {
            playSound(`./audio/pronouns/story/${localStorage.getItem('age')}/${localStorage.getItem('activity')}/${$(this).parent().text().toLowerCase().trim().replace(/[^a-zA-Z\s]/g, '').replaceAll(' ', '_')}.mp3`);
        });
    }

    render();

    $('.story input').on('input', function() {
        var sanitizedValue = $(this).val().replace(/[^A-Za-z]/g, '');
        sanitizedValue = sanitizedValue.substring(0, 4);
        $(this).val(sanitizedValue);
    });

    $('.story input').on('input', checkValue);

    function checkValue(e) {
        $this = e.currentTarget;
        let sanitizedValue = $(this).val().replace(/[^A-Za-z]/g, '');
        sanitizedValue = sanitizedValue.substring(0, 4);
        $(this).val(sanitizedValue);
        if (checkIfAllFilled() === true) {
            $('button:contains("check")').removeAttr('disabled');
        } else {
            $('button:contains("check")').attr('disabled', 'disabled');
        }
    }

    /// CHANGED TO IF 8 out of 10 FILLED
    function checkIfAllFilled() {
        let allFilled = false;
        let count = 0;
        $('.story input').each(function() {
            if ($(this).val().trim() !== '') {
                count += 1;
            }
        });

        if (count >= 8) {
            allFilled = true;
        }
        return allFilled;
    }

    $('button:contains("check")').on('click', function() {
		checkResponses();
	});

    function checkResponses() {
        console.log("check responses");
        $('.story input').attr('disabled', true);
        $('.story input').each(function() {
            if ($(this).val().trim() === $(this).data('answer').trim()) {
                $(this).addClass('correct animate__animated animate__bounce animate__slow');
            } else {
                $(this).addClass('incorrect animate__animated animate__shakeX animate__slow');
            }
        });

        if (data[localStorage.getItem('age')][localStorage.getItem('activity')].length > 0) {
            setTimeout(() => {
                $('.story').children(':first-child').empty();
                $('.story').children(':nth-child(2)').empty();
                $('button:contains("check")').attr('disabled', 'disabled');
                render();
                $('.story input').on('input', checkValue);
            }, 2000);
        } 
    }

});