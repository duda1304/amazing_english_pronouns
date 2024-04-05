$(document).ready(function () {

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const number_of_images = {
        'i' : 3,
        'you' : 6,
        'he' : 3,
        'she' : 3,
        'it' : 3,
        'we' : 3,
        'they' : 6
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

    function createPossibleAnswers(arr, correctAnswer, answersCount) {
        let proposedAnswers = [correctAnswer];
        while (proposedAnswers.length < answersCount) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            if (!proposedAnswers.includes(arr[randomIndex])) {
                proposedAnswers.push(arr[randomIndex]);
            }
        }
        return shuffleArray(proposedAnswers);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function renderProposedAnswers(selector, allAnswers, correctAnswer) {
        const count = $(selector).length;
        const proposedAnswers = createPossibleAnswers(allAnswers, correctAnswer, count);
        $(selector).each(function(){
            $(this).text(proposedAnswers.shift());
        })
    }
   
    function render() {
        randomElement = pickAndRemoveRandomElement(images);
        correctAnswer = randomElement.split('_')[0];
        document.querySelector('.container-right img').src = `media/1_1/${randomElement}`;
        renderProposedAnswers('#proposed_answers>div', pronouns, correctAnswer);
    }

    function showMessage(message) {
        $('.modal-body').text(message);
        $('.modal').modal('show');
    }

    function hideMessage() {
        $('.modal').modal('hide');
    }

    const images = imageFileNames(pronouns, number_of_images);
    let tryCount = 0;
    let randomElement;
    let correctAnswer;

    render();
   
    $('#proposed_answers>div').on('click', function() {
        tryCount += 1;
        if ($(this).text().toLowerCase() === correctAnswer) {
            $(this).addClass('correct animate__animated animate__bounce animate__slow');
            if (images.length > 0) {
                setTimeout(() => {
                    tryCount = 0;
                    $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                    render();
                }, 2000);
            } else {
                $(this).on('click', function(){return})
            }
        } else {
            if (tryCount < 2) {
                $(this).addClass('incorrect animate__animated animate__shakeX animate__slow');
                showMessage('Please try again');
                setTimeout(() => {
                    hideMessage();
                    $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                }, 2000);
            } else {
                $(`#proposed_answers>div:contains("${correctAnswer}")`).addClass('correct animate__animated animate__bounce animate__slow');
                if (images.length > 0) {
                    setTimeout(() => {
                        tryCount = 0;
                        $(`#proposed_answers>div:contains("${correctAnswer}")`).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                        render();
                    }, 2000);
                } else {
                    $(this).on('click', function(){return})
                }
            }
        }
    });

    // $('button:contains("next")').on('click', function() {
    //     if (images.length > 0) {
    //         randomElement = pickAndRemoveRandomElement(images);
    //         correctAnswer = randomElement.split('_')[0];
    //         document.querySelector('.card2').src = `media/1_1/${randomElement}`;
    //         renderProposedAnswers('#proposed_answers>div', pronouns, correctAnswer);
    //     } else {
    //         $(this).attr('disabled', true);
    //     }
    // });


});


