$(document).ready(function () {

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const number_of_images = {
        'i' : 3,
        'you' : 4,
        'he' : 5,
        'she' : 7,
        'it' : 11,
        'we' : 4,
        'they' : 2
    };
    const possibleAnswersBoolean = ['correct', 'incorrect'];

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

    let correct_incorrect = '';
    function createPossibleAnswer(arr, correctAnswer) {
        let proposedAnswer;
        let randomIndex = Math.floor(Math.random() * possibleAnswersBoolean.length);

        correct_incorrect = possibleAnswersBoolean[randomIndex];
        if (possibleAnswersBoolean[randomIndex] === 'correct') {
            proposedAnswer = correctAnswer;
        } else {
            let randomIndex = Math.floor(Math.random() * arr.length);
            proposedAnswer = arr[randomIndex];
        }
        return proposedAnswer;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function renderProposedAnswers(selector, allAnswers, correctAnswer) {
        const proposedAnswer = createPossibleAnswer(allAnswers, correctAnswer);
        $(selector).text(proposedAnswer);
    }
   
    function render() {
        randomElement = pickAndRemoveRandomElement(images);
        correctAnswer = randomElement.split('_')[0];
        document.querySelector('.container-right img').src = `media/1_3/${randomElement}`;
        renderProposedAnswers('.white-circle', pronouns, correctAnswer);
    }

    const images = imageFileNames(pronouns, number_of_images);
    let randomElement;
    let correctAnswer;

    render();
   
    function checkAnswer(event) {
        $this = event.currentTarget;
        $(this).next().off('click', checkAnswer);
        if ($(this).data('answer') === correct_incorrect) {
            $(this).addClass('correct animate__animated animate__bounce animate__slow');
        } else {
            $(this).addClass('incorrect animate__animated animate__shakeX animate__slow');
        }

        if (images.length > 0) {
            setTimeout(() => {
                correct_incorrect = '';
                $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                render();
                $(this).next().on('click', checkAnswer);
            }, 2000);
        } else {
            $(this).off('click', checkAnswer);
        }

        // if ($(this).data('answer') === correct_incorrect) {
        //     $(this).addClass('correct animate__animated animate__bounce animate__slow');
        //     if (images.length > 0) {
        //         setTimeout(() => {
        //             correct_incorrect = '';
        //             $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
        //             render();
        //             $(this).next().bind('click', checkAnswer);
        //         }, 2000);
        //     } else {
        //         $(this).unbind('click', checkAnswer);
        //     }
        // } else {
        //     $(this).addClass('incorrect animate__animated animate__shakeX animate__slow');
        //         if (images.length > 0) {
        //             setTimeout(() => {
        //                 correct_incorrect = '';
        //                 $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
        //                 render();
        //                 $(this).next().bind('click', checkAnswer);
        //             }, 2000);
        //         } else {
        //             $(this).unbind('click', checkAnswer);
        //         }
        // }
    }

    $('div[data-answer="correct"], div[data-answer="incorrect"]').on('click', checkAnswer);
   
});


