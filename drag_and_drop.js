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
   
    function pickAndRemoveRandomElement(arr, exclude) {
        let found  = false;
        console.log("sadsdsad")
        let removedElement;
        while (found === false) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            let randomElement = arr[randomIndex];
            if (exclude.includes(randomElement.split('_')[0]) === false) {
                removedElement = arr.splice(randomIndex, 1)[0];
                found = true;
            }
        }
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
        let exclude = [];
        while (count <= 3) {
            let randomElement = pickAndRemoveRandomElement(images, exclude);
            
            document.querySelectorAll('.container-right img:not(.audio-icon)')[count].src = `media/1_4/${randomElement}`;
            exclude.push(randomElement.split('_')[0]);
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


    let text = '';
    let identifier = '';

    $('#proposed_answers div').on('dragstart', function(event) {
        // event.originalEvent.dataTransfer.setData("text", $(this).text().toUpperCase()); 
        text = $(this).text().toUpperCase();
        const randomString = generateRandomString(10);
        $(this).attr('id', randomString);
        // event.originalEvent.dataTransfer.setData("identifier", randomString);
        identifier = randomString;
    });
    
    let count = 0;
    $('.container-right .drop_box').on('drop', function(event) {
        event.preventDefault();
        if ($(event.currentTarget).find('input').val() === '') {
            // const data = event.originalEvent.dataTransfer.getData("text");
            // $(event.currentTarget).find('input').val(data);
            $(event.currentTarget).find('input').val(text);

            // const identifier = event.originalEvent.dataTransfer.getData("identifier");
            $(`#${identifier}`).css('opacity', '0.1');
            $(`#${identifier}`).attr('draggable', 'false');
            $(event.currentTarget).find('input').data('answer_id', identifier);
    
            count += 1;
            if (count === $('.container-right img').length) {
                count = 0;
                checkResponses();
            }
        } else {
            // const data = event.originalEvent.dataTransfer.getData("text");
            // $(event.currentTarget).find('input').val(data);
            $(event.currentTarget).find('input').val(text);
            // const identifier = event.originalEvent.dataTransfer.getData("identifier");

            $(`#${$(event.currentTarget).find('input').data('answer_id')}`).css('opacity', '1');
            $(`#${$(event.currentTarget).find('input').data('answer_id')}`).attr('draggable', 'true');

            $(event.currentTarget).find('input').data('answer_id', identifier);
            $(`#${identifier}`).css('opacity', '0.1');
            $(`#${identifier}`).attr('draggable', 'false');
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
                    $('#proposed_answers div').css('opacity', '1');
                    $('#proposed_answers div').attr('draggable', 'true');
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
                    $('#proposed_answers div').css('opacity', '1');
                    $('#proposed_answers div').attr('draggable', 'true');
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
                        $('#proposed_answers div').css('opacity', '1');
                        $('#proposed_answers div').attr('draggable', 'true');
                        $('.match-game-column input').val('');
                        render();
                    }, 2000);
                }
            }
        }
    }

    // $(".container-right img").on('load', function() {
    //     const width = this.naturalWidth;
    //     const height = this.naturalHeight;
    
    //     if (height/width >= 1.5) {
    //         this.style.height = "90%";
    //     } else if (height === width) {
    //         this.style.height = "40%";
    //     } else {
    //         if (width/height >= 1.5) {
    //             this.style.height = "40%";
    //         } else if (width/height >= 1.2) {
    //             this.style.height = "60%";
    //         } else {
    //             this.style.height = "80%";
    //         }
    //     }
    // });
    
    const sizes = {
        'it_1' : '30%',
        'it_2' : '70%',
        'it_3' : '50%',
        'it_4' : '40%',
        'it_5' : '50%',
        'it_6' : '80%',
        'it_7' : '60%',
        'it_8' : '70%',
        'it_9' : '70%',
        'it_10' : '30%',
        'it_11' : '40%',
        'it_12' : '80%',
        'it_13' : '40%',
        'it_14' : '60%',
        'it_15' : '50%',
        'it_16' : '70%',
        'it_17' : '60%',
        'it_18' : '60%',
        'it_19' : '70%',
        'it_20' : '70%',
        'it_21' : '70%',
        'it_22' : '70%'
    }

    $(".container-right img").on('load', function() {
        console.log(this.src);
        const width = this.naturalWidth;
        const height = this.naturalHeight;

        if (this.src.includes('i_')) {
            this.style.height = "90%";
        } else if (this.src.includes('he_') || this.src.includes('she_')) {
            this.style.height = "90%";
        } else if (this.src.includes('you_') || this.src.includes('they_') || this.src.includes('we_')) {
            this.style.height = "90%";
        } else {
            this.style.height = sizes[this.src.split('/')[this.src.split('/').length -1].split('.')[0]];
        }

        if (this.src.includes('they_3')) {
            this.style.height = '70%';
        }
    });

});

