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
            'it' : 11,
            'we' : 4,
            'they' : 2
        }
        folder = '1_3';
    } else {
        number_of_images = {
            'i' : 2,
            'you' : 5,
            'he' : 5,
            'she' : 5,
            'it' : 10,
            'we' : 7,
            'they' : 2
        }
        folder = '2_1';
    }

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
        
       
        else if (height/width >= 1.5) {
            this.style.height = "90%";

        } else if (height === width) {
            this.style.height = "40%";
        } else {
            if (width/height >= 1.5) {
                this.style.height = "40%";
            } else if (width/height >= 1.2) {
                this.style.height = "60%";
            } else {
                this.style.height = "90%";
                // this.style.marginLeft = "20%";
                this.style.marginTop = "20%";
            }
        }

        if (this.src.includes('you_') || this.src.includes('they_') || this.src.includes('we_')) {
            console.log("mistake")
            $('.rounded-circle')[0].style.left = "40%";
            this.style.marginLeft = "0%";
            // this.style.marginTop = "25%";
            this.style.marginTop = "max(18%, 35px)";
            this.style.height = "80%";
        } 

        if (this.src.includes('it_4') || this.src.includes('it_5')) {
            this.style.height = "60%";
            this.style.marginLeft = "0%";
            this.style.marginTop = "20%";
        }
    
    });
    
});


