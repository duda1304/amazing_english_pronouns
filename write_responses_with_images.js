$(document).ready(async function () {

    const data = [
        {
            '1' : [
                {
                    'en' : 'Hi, $input am Kelly.',
                    'fr' : 'Bonjour, je m’appelle Kelly.',
                    'answer': 'i'
                },
                {
                    'en' : 'This is Abby. $input is my best friend.',
                    'fr' : 'Voici Abby. C’est ma meilleure amie.',
                    'answer': 'she'
                },
                {
                    'en' : 'This is Liam. $input is my friend too.',
                    'fr' : 'Voici Liam. C’est aussi mon ami.',
                    'answer': 'he'
                },
                {
                    'en' : '$input are my best friends.',
                    'fr' : 'Ils sont mes meilleurs amis.',
                    'answer': 'they'
                },
                {
                    'en' : '$input are students at Peter Marshall school.',
                    'fr' : 'Nous sommes étudiants à l’école Peter Marshall.',
                    'answer': 'we'
                },
                {
                    'en' : '$input is a great school.',
                    'fr' : 'C’est une bonne école.',
                    'answer': 'it'
                }
            ]
        },
        {
            '2' : [
                {
                    'en' : 'Hi, $input am Sarah.',
                    'fr' : 'Bonjour, je m’appelle Sarah.',
                    'answer': 'i'
                },
                {
                    'en' : 'This is Ben. $input is my neighbour.',
                    'fr' : 'Voici Ben. C’est mon voisin.',
                    'answer': 'he'
                },
                {
                    'en' : '$input is very nice and helpful.',
                    'fr' : 'Il est très sympathique et aimable.',
                    'answer': 'he'
                },
                {
                    'en' : '$input lives in a beautiful and big house.',
                    'fr' : 'Il vit dans une belle et grande maison.',
                    'answer': 'he'
                },
                {
                    'en' : '$input has 4 bedrooms, 3 bathrooms and a pool.',
                    'fr' : 'Elle dispose de 4 chambres, 3 salles de bain et une piscine.',
                    'answer': 'it'
                },
                {
                    'en' : '$input is the most expensive house in the area.',
                    'fr' : 'C’est la maison la plus chère du quartier.',
                    'answer': 'it'
                }
            ]
        },
        {
            '3' : [
                {
                    'en' : 'Hi, $input am Karen and this is my family.',
                    'fr' : 'Bonjour, Je m’appelle Karen et voici ma famille.',
                    'answer': 'i'
                },
                {
                    'en' : 'This is my father, Tom. $input is a good cook and an excellent dancer.',
                    'fr' : 'Voici mon père. C’est un bon cuisinier et un excellent danseur.',
                    'answer': 'he'
                },
                {
                    'en' : 'This is my mother, Jade. $input is funny, and very creative.',
                    'fr' : 'Voici ma mère, Jade. Elle est marrante et très créative.',
                    'answer': 'she'
                },
                {
                    'en' : 'This is my big brother, Liam. $input is caring and a talented guitarist.',
                    'fr' : 'Voici mon frère, Liam. Il est attentionné et un guitariste talentueux.',
                    'answer': 'he'
                },
                {
                    'en' : 'This is my little sister, Anna. $input is a hard-working girl and mature.',
                    'fr' : 'Voici ma petite soeur, Anna. C’est une fille travailleuse et mature.',
                    'answer': 'she'
                },
                {
                    'en' : '$input all live together in New York city centre.',
                    'fr' : 'Nous vivons tous ensemble dans le centre-ville de New York.',
                    'answer': 'we'
                }
            ]
        },
        {
            '4' : [
                {
                    'en' : 'This is the Beneth’s family. $input come from Ireland.',
                    'fr' : 'Voici la famille Beneth. Ils viennent d’Irlande.',
                    'answer': 'they'
                },
                {
                    'en' : 'This is James. $input lives with his family in Dublin.',
                    'fr' : 'Voici James. Il habite avec sa famille à Dublin.',
                    'answer': 'he'
                },
                {
                    'en' : 'His wife is called Helen. $input works as a nurse.',
                    'fr' : 'Sa femme s’appelle Helen. Elle travaille en tant qu’infirmière.',
                    'answer': 'she'
                },
                {
                    'en' : '$input have twins, Amber and Victoria.',
                    'fr' : 'Ils ont des jumelles, Amber et Victoria.',
                    'answer': 'they'
                },
                {
                    'en' : '$input are students at the Trinity College Dublin.',
                    'fr' : 'Elles sont étudiantes au Trinity College de Dublin.',
                    'answer': 'they'
                },
                {
                    'en' : '$input all live together in Dublin city centre.',
                    'fr' : 'Ils vivent tous ensemble dans le centre ville de Dublin.',
                    'answer': 'they'
                }
            ]
        },
        {
            '5' : [
                {
                    'en' : '$input go to school every day at 8 am.',
                    'fr' : 'Nous allons tous les jours à l’école à 8 heures.',
                    'answer': 'we'
                },
                {
                    'en' : '$input study at Saint Patrick school.',
                    'fr' : 'Nous étudions à l’école Saint Patrick.',
                    'answer': 'we'
                },
                {
                    'en' : '$input has a prestigious reputation.',
                    'fr' : 'Elle a une réputation prestigieuse.',
                    'answer': 'it'
                },
                {
                    'en' : '$input recruits its teachers very carefully.',
                    'fr' : 'Elle recrute ses professeurs avec soin.',
                    'answer': 'it'
                },
                {
                    'en' : '$input are all highly qualified.',
                    'fr' : 'Ils sont tous très qualifiés.',
                    'answer': 'they'
                },
                {
                    'en' : '$input are very lucky to be able to study here.',
                    'fr' : 'Nous sommes très chanceux de pouvoir étudier ici.',
                    'answer': 'we'
                }
            ]
        },
        {
            '6' : [
                {
                    'en' : 'This is Anna. $input is my best friend.',
                    'fr' : 'Voici Anna. C’est ma meilleure amie.',
                    'answer': 'she'
                },
                {
                    'en' : '$input have known each other for twenty-five years.',
                    'fr' : 'Nous nous connaissons depuis vingt-cinq ans.',
                    'answer': 'we'
                },
                {
                    'en' : 'I like her because $input is nice, caring and funny.',
                    'fr' : 'Je l’aime bien parce qu’elle est gentille, attentionnée et drôle.',
                    'answer': 'she'
                },
                {
                    'en' : '$input have a lot in common.',
                    'fr' : 'Nous avons beaucoup de points communs.',
                    'answer': 'we'
                },
                {
                    'en' : 'The moments $input spend together are precious.',
                    'fr' : 'Les moments que nous passons ensemble sont précieux.',
                    'answer': 'we'
                },
                {
                    'en' : '$input hope our friendship will last a lifetime.',
                    'fr' : 'J’espère que notre amitié durera toute notre vie.',
                    'answer': 'i'
                }
            ]
        },
        {
            '7' : [
                {
                    'en' : 'This is my brother, Gary. $input is the best!',
                    'fr' : 'Voici mon frère, Gary. C’est le meilleur!',
                    'answer': 'he'
                },
                {
                    'en' : '$input lives on his own in Paris now.',
                    'fr' : 'Il vit seul à Paris maintenant.',
                    'answer': 'he'
                },
                {
                    'en' : '$input still live with our parents.',
                    'fr' : 'Je vis toujours chez nos parents.',
                    'answer': 'i'
                },
                {
                    'en' : '$input try to spend a lot of time together.',
                    'fr' : 'Nous essayons de passer beaucoup de temps ensemble.',
                    'answer': 'we'
                },
                {
                    'en' : '$input am going to visit him next week.',
                    'fr' : 'Je vais lui rendre visite la semaine prochaine.',
                    'answer': 'i'
                },
                {
                    'en' : '$input can’t wait to see him.',
                    'fr' : 'J’ai hâte de le voir.',
                    'answer': 'i'
                }
            ]
        }
    ];

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

    let currentPage = 1;
    let previousAnswers = {'1' : {}, '2' : {}, '3' : {}, '4' : {}, '5' : {}, '6' : {}, '7' : {}};
   
    function render() {
        const pageData = data[currentPage -1];
        const identifier = Object.keys(pageData)[0];
        const textData = pageData[identifier];

        for (let i = 0; i < 3; i++) {
            $('.story').children(':first-child').append(`
            <div class="col-4 p-1 p-xl-2">
                <div class="box-31012">
                    <p class="story-box-count">${i+1}</p>
                    <div class="top-image-31012">
                        <img src="./media/3_3/${identifier}_${i+1}.png" alt="Image">
                    </div>
                    <div class="bottom-text-31012 p-1 p-md-2">
                        <p class="bottom-english-31012">${textData[i]['en'].replace('$input', `<input type="text" class="form-control d-inline-block" data-index="${i+1}" value="${previousAnswers[currentPage][i+1] ? previousAnswers[currentPage][i+1] : ''}" data-answer="${textData[i]['answer']}">`)}</p>
                        <p class="bottom-french-31012">(${textData[i]['fr']})</p>
                    </div>
                </div>
            </div>`)
        }
        for (let i = 3; i < 6; i++) {
            $('.story').children(':nth-child(2)').append(`
            <div class="col-4 p-1 p-xl-2">
                <div class="box-31012">
                    <p class="story-box-count">${i+1}</p>
                    <div class="top-image-31012">
                        <img src="./media/3_3/${identifier}_${i+1}.png" alt="Image">
                    </div>
                    <div class="bottom-text-31012 p-1 p-md-2">
                        <p class="bottom-english-31012">${textData[i]['en'].replace('$input', `<input type="text" class="form-control d-inline-block" data-index="${i+1}" value="${previousAnswers[currentPage][i+1] ? previousAnswers[currentPage][i+1] : ''}" data-answer="${textData[i]['answer']}">`)}</p>
                        <p class="bottom-french-31012">(${textData[i]['fr']})</p>
                    </div>
                </div>
            </div>`)
        }
        $('button:contains("story")').on('click', function() {
            playSound(`./audio/pronouns/story/listen_story/story ${identifier}.mp3`);
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

    function checkIfAllFilled() {
        let allFilled = true;
        $('.story input').each(function() {
            if ($(this).val().trim() === '') {
                allFilled = false;
                return;
            }
        });
        return allFilled;
    }

    $('button:contains("check")').on('click', function() {
		checkResponses();
	});

    $('button:contains("next")').on('click', function() {
        storePreviousAnswers();
        currentPage += 1;
        renderNext();
    });

    $('button:contains("previous")').on('click', function() {
        storePreviousAnswers();
        currentPage -= 1;
        renderNext();
    });

    function storePreviousAnswers() {
        $('.correct').each(function() {
            previousAnswers[currentPage][$(this).data('index')] = $(this).val()
        })
    }

    function checkResponses() {
        $('.story input').attr('disabled', true);
        $('.story input').each(function() {
            if ($(this).val().trim().toLowerCase() === $(this).data('answer').trim()) {
                $(this).addClass('correct animate__animated animate__bounce animate__slow');
            } else {
                $(this).addClass('incorrect animate__animated animate__shakeX animate__slow');
            }
        });

        $('button:contains("listen")').removeAttr('disabled');
        if (currentPage === data.length) {
            $('button:contains("previous")').show()
            $('button:contains("next")').hide();
        } else if (currentPage === 1) {
            $('button:contains("next")').show();
            $('button:contains("previous")').hide()
        } else {
            $('button:contains("next")').show();
            $('button:contains("previous")').show();
        }
        $('button:contains("check")').attr('disabled', 'disabled');
    }

    function renderNext() {
        $('.story').children(':first-child').empty();
        $('.story').children(':nth-child(2)').empty();
        $('button:contains("check")').show();
        $('button:contains("check")').attr('disabled', 'disabled');
        $('button:contains("listen")').attr('disabled', 'disabled');
        $('button:contains("next")').hide();
        $('button:contains("previous")').hide();
        if ($('audio').length !== 0) {
            $('audio')[0].pause();
        }
        
        render();
        $('.story input').on('input', checkValue);
    }

});