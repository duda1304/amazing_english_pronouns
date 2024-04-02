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
            $(this).text(proposedAnswers.shift().toUpperCase());
        })
    }

    // function storeCurrentStatus() {
    //     localStorage.setItem('images', images);
    //     localStorage.setItem('proposedAnswers', images);
    // }

    const images = imageFileNames(pronouns, number_of_images);
    // let proposedAnswers = [];

    // images.forEach(image => {
    //     const correctAnswer = image.split('_')[0];
    //     proposedAnswers.push(renderProposedAnswers('figure>div>div', pronouns, correctAnswer));
    // });

    const randomElement = pickAndRemoveRandomElement(images);
    const correctAnswer = randomElement.split('_')[0];
    document.querySelector('.card2').src = `media/1_1/${randomElement}`;
    renderProposedAnswers('figure>div>div', pronouns, correctAnswer);
   
    $('button:contains("next")').on('click', function() {
        if (images.length > 0) {
            const randomElement = pickAndRemoveRandomElement(images);
            const correctAnswer = randomElement.split('_')[0];
            document.querySelector('.card2').src = `media/1_1/${randomElement}`;
            renderProposedAnswers('figure>div>div', pronouns, correctAnswer);
        } else {
            $(this).attr('disabled', true);
        }
    });
});


