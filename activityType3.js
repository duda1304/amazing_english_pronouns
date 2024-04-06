$(document).ready(function () {

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const number_of_images = {
        'i' : 9,
        'you' : 17,
        'he' : 14,
        'she' : 18,
        'it' : 22,
        'we' : 18,
        'they' : 10
    };

    function imageFileNames(pronouns, number_of_images) {
        let fileNames = [];
        pronouns.forEach(element => {
            for (let i = 1; i <= number_of_images[element]; i++) {
                fileNames.push(`${element}_${i}.png`);
            }
        });
        return shuffleArray(fileNames);
    }    
   
    function pickAndRemoveRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const removedElement = arr.splice(randomIndex, 1)[0];
        return removedElement;
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function render() {
        let count = 0;

        let answers = [];
        while (count <= 3) {
            let randomElement = pickAndRemoveRandomElement(images);
            document.querySelectorAll('.container-right img')[count].src = `media/1_4/${randomElement}`;
            answers.push(randomElement.split('_')[0]);
            count += 1;
        }

        let proposedAnswers = shuffleArray(answers);

        count = 0;
        while (count <= 3) {
            document.querySelectorAll('#proposed_answers div')[count].textContent = proposedAnswers[count];
            count += 1;
        }
    }

    const images = imageFileNames(pronouns, number_of_images);
    render();
   
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    $('.container-right .drop_box').on('dragover', function(event) {
        event.preventDefault();
    });
    
    $('#proposed_answers div').attr('draggable', 'true');


    $('#proposed_answers div').on('dragstart', function(event) {
        event.originalEvent.dataTransfer.setData("text", $(this).text().toUpperCase()); 
        const identifier = generateRandomString(10);
        $(this).attr('id', identifier);
        event.originalEvent.dataTransfer.setData("identifier", identifier);
    });
    
    let count = 0;
    $('.container-right .drop_box').on('drop', function(event) {
        event.preventDefault();
        if ($(event.currentTarget).find('input').val() === '') {
            const data = event.originalEvent.dataTransfer.getData("text");
            $(event.currentTarget).find('input').val(data);
    
            const identifier = event.originalEvent.dataTransfer.getData("identifier");
            $(`#${identifier}`).css('visibility', 'hidden');
    
            count += 1;
            if (count === $('.container-right img').length) {
                count = 0;
                checkResponses();
            }
        } else {
            return
        }        
    });

    let countCorrect = 0;
    let countTry = 0;
    function checkResponses() {
        countTry += 1;
        $('.match-game-column').each(function() {
            const file_name_parts = $(this).find('img').attr('src').split('/');
            if (file_name_parts[file_name_parts.length - 1].split('_')[0] === $(this).find('input').val().toLowerCase()) {
                $(this).find('input').addClass('correct animate__animated animate__bounce animate__slow');
                countCorrect += 1;
            } else {
                $(this).find('input').addClass('incorrect animate__animated animate__shakeX animate__slow');
            }
        });
    
        if (countTry === 2) {
            if (images.length > 0) {
                setTimeout(() => {
                    countCorrect = 0;
                    countTry = 0;
                    $('.match-game-column input').each(function() {
                        $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX')
                    });
                    $('#proposed_answers div').css('visibility', '');
                    $('.match-game-column input').val('');
                    render();
                }, 2000);
            }
        } else {
            if (countCorrect < $('.match-game-column').length) {
                $('.modal-body').text('Please try again');
                $('.modal').modal('show');
                setTimeout(() => {
                    $('.modal').modal('hide');
                    $('.match-game-column input').each(function() {
                        $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX')
                    });
                    $('#proposed_answers div').css('visibility', '');
                    $('.match-game-column input').val('');
                }, 2000);
            } else {
                if (images.length > 0) {
                    setTimeout(() => {
                        countCorrect = 0;
                        countTry = 0;
                        $('.match-game-column input').each(function() {
                            $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX')
                        });
                        $('#proposed_answers div').css('visibility', '');
                        $('.match-game-column input').val('');
                        render();
                    }, 2000);
                }
            }
        }
    }
   
});

