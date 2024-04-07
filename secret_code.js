$(document).ready(function () {

   
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    let number_of_images = {
        // 'i' : 2,
        // 'you' : 5,
        // 'he' : 4,
        // 'she' : 7,
        // 'it' : 5,
        // 'we' : 4,
        // 'they' : 3
    };

    if (localStorage.getItem('age') == 2) {
        number_of_images = {
            'i' : 2,
            'you' : 5,
            'he' : 4,
            'she' : 7,
            'it' : 5,
            'we' : 4,
            'they' : 3
        }
    }

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
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    function render() {
        let randomElement = pickAndRemoveRandomElement(images);
        let correctAnswer = randomElement.split('_')[0];
        $('#proposed_answer div').text(correctAnswer);


        const proposedNumbersCount = $('.secret-code > div').length;
        const codeLength = $('input[type="text"]').length;

        let count = 1;
        let proposedImages = [randomElement];
        while (count < proposedNumbersCount) {
            if (count < codeLength) {
                let sameMeaningImage = images.find(element => element.split('_')[0] === correctAnswer && element !== randomElement);
                const index = images.indexOf(sameMeaningImage);
                images.splice(index, 1)[0];
                proposedImages.push(sameMeaningImage);
            } else {
                let found = false;
                while (found === false) {
                    let randomElement = pickAndRemoveRandomElement(images);
                    if (randomElement.split('_')[0] !== correctAnswer) {
                        proposedImages.push(randomElement);
                        found = true;
                    }
                }
            }
            count += 1;
        }

        let proposedImagesShuffled = shuffleArray(proposedImages);
        proposedImagesShuffled.forEach((value,index) => {
            document.querySelectorAll('.container-right img:not(.audio-icon)')[index].src = `media/${localStorage.getItem('age')}_${localStorage.getItem('activity')[localStorage.getItem('activity').length -1]}/${value}`;
            $(document.querySelectorAll('.container-right img:not(.audio-icon)')[index]).parent().next().text(Math.floor(Math.random() * 9) + 1);
            if (value.split('_')[0] === correctAnswer) {
                $($('.proposed_part_of_code')[index]).parent().next().data('correct', 'true');
            } else {
                $($('.proposed_part_of_code')[index]).parent().next().data('correct', 'false');
            }
        });
    }

    const images = imageFileNames(pronouns, number_of_images);
    render();
   
    $('.proposed_part_of_code').on('click', function() {
        let emptyInputs = $('input:text').filter(function() {
            return $(this).val().trim() === '';
        });
        if (emptyInputs.length !== 0 && $(this).data('selected') !== 'true') {
            $(emptyInputs[0]).val($(this).text());
            $(this).data('selected', 'true');
        }
        emptyInputs = $('input:text').filter(function() {
            return $(this).val().trim() === '';
        });
        
        if (emptyInputs.length === 0) {
            checkCode();
        }
    });
console.log('ASDADS')
    function checkCode() {
        const elements = $('.proposed_part_of_code').filter(function() {
            return $(this).data('selected') === 'true';
        });
        elements.each(function(index,value) {
            if ($(this).data('correct') !== 'true' && $($('input:text')[index]).val() === $(this).text()) {
                $($('input:text')[index]).addClass('correct animate__animated animate__bounce animate__slow');
            } else {
                $($('input:text')[index]).addClass('incorrect animate__animated animate__shakeX animate__slow');
            }
        })
    }
    $(".container-right img").on('load', function() {
        const width = this.naturalWidth;
        const height = this.naturalHeight;
    
        if (height/width >= 1.5) {
            this.style.height = "90%";
        } else if (height === width) {
            this.style.height = "40%";
        } else {
            if (width/height >= 1.5) {
                this.style.height = "40%";
            } else if (width/height >= 1.2) {
                this.style.height = "60%";
            } else {
                this.style.height = "80%";
            }
        }
    });
   
});

