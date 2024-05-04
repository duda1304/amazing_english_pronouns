$(document).ready(function () {

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    let number_of_images;
    let folder;

    if (localStorage.getItem('age') == '1') {
        number_of_images = {
            'i' : 3,
            'you' : 4,
            'he' : 5,
            'she' : 7,
            'it' : 9,
            'we' : 4,
            'they' : 4
        }
        folder = '1_3';
    } else {
        number_of_images = {
            'i' : 2,
            'you' : 5,
            'he' : 5,
            'she' : 5,
            'it' : 10,
            'we' : 6,
            'they' : 3
        }
        folder = '2_1';
    }

    // const possibleAnswersBoolean = ['correct', 'incorrect'];
    // TEMP
    const possibleAnswersBoolean = ['correct', 'correct'];

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
        if (correct_incorrect === 'correct') {
            proposedAnswer = correctAnswer;
        } else {
            let indexOfCorrect = arr.indexOf(correctAnswer);
            if (indexOfCorrect !== -1) {
                arr.splice(indexOfCorrect, 1);
            }
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
        document.querySelector('.container-right img:not(.audio-icon)').src = `media/${folder}/${randomElement}`;
        renderProposedAnswers('.white-circle', pronouns, correctAnswer);
    }

    const images = imageFileNames(pronouns, number_of_images);
    let randomElement;
    let correctAnswer;

    render();
   
    function checkAnswer(event) {
        // TEMP
        if (images.length > 0) {
            render();
        }
        return;
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
    }

    $('div[data-answer="correct"], div[data-answer="incorrect"]').on('click', checkAnswer);
   
    let sizes;

    if (localStorage.getItem('age') == '1') {
        sizes = {
            'it_1' : '70%',
            'it_2' : '50%',
            'it_3' : '50%',
            'it_4' : '80%',
            'it_5' : '60%',
            'it_6' : '60%',
            'it_7' : '70%',
            'it_8' : '50%',
            'it_9' : '30%',
        }
    } else {
        sizes = {
            'it_1' : '60%',
            'it_2' : '70%',
            'it_3' : '80%',
            'it_4' : '50%',
            'it_5' : '70%',
            'it_6' : '70%',
            'it_7' : '60%',
            'it_8' : '50%',
            'it_9' : '70%',
            'it_10' : '70%'
        }
    }
    $(".container-right img").on('load', function() {
        console.log("sdsa");
        const width = this.naturalWidth;
        const height = this.naturalHeight;

        $('.rounded-circle')[0].style.left = "3%";

        if (this.src.includes('i_') || this.src.includes('he_') || this.src.includes('she_')) {
            this.style.height = "100%";
            this.style.marginTop = "0%";
            this.style.marginLeft = "10px";
        }
        
        if (this.src.includes('you_') || this.src.includes('they_') || this.src.includes('we_')) {
            console.log("mistake")
            $('.rounded-circle')[0].style.left = "40%";
            this.style.marginLeft = "0%";
            // this.style.marginTop = "25%";
            this.style.marginTop = "max(18%, 35px)";
            this.style.height = "80%";
        } 

        if (this.src.includes('they_3')) {
            this.style.marginTop = "max(15%, 35px)";
        }

        if (localStorage.getItem('age') == '1' && (this.src.includes('they_3') || this.src.includes('they_4'))) {
            this.style.height = '50%';
            this.style.marginLeft = "0%";
            this.style.marginTop = "20%";
        }
 
        if (this.src.includes('it_')) {
            this.style.height = sizes[this.src.split('/')[this.src.split('/').length -1].split('.')[0]];
            this.style.marginLeft = "0%";
            this.style.marginTop = "20%";
        }
    
    });
    
});


