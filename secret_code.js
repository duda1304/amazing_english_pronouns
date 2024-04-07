$(document).ready(function () {

   
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    let number_of_images = {};
    let dir = '';
    if (localStorage.getItem('age') == '2') {
        number_of_images = {
            'i' : 2,
            'you' : 5,
            'he' : 4,
            'she' : 7,
            'it' : 5,
            'we' : 4,
            'they' : 3
        };
        dir = '2_3';
    } else {
        number_of_images = {
            'i' : 3,
            'you' : 3,
            'he' : 7,
            'she' : 10,
            'it' : 12,
            'we' : 6,
            'they' : 6
        };
        dir = '3_1';
    }

    function imageFileNames(pronouns, number_of_images) {
        let fileNames = [];
        pronouns.forEach(element => {
            let array = [];
            for (let i = 1; i <= number_of_images[element]; i++) {
                array.push(`${element}_${i}.png`);
            }
            fileNames.push(shuffleArray(array));
        });
        return fileNames;
    }    

    function compilePages(codeLength, proposalCount) {
        let pages = [];
        const noOfPages = 10;

        while (pages.length < noOfPages) {
            images.forEach(element => {
                if (pages.length === noOfPages) {
                    return;
                }
                if (element.length >= codeLength) {
                    let imageElements = element.splice(0,codeLength);
                    pages.push(imageElements);
                }
            });
            shuffleArray(images);
        }
       
        let combinedArray = shuffleArray([].concat(...images));

        pages.forEach(page => {
            let index = combinedArray.findIndex(element => element.split('_')[0] !== page[0].split('_')[0]);
            if (index !== -1) {
                page.push(combinedArray[index]);
                combinedArray.splice(index, 1);
            }
        });

        shuffleArray(pages);

        if (combinedArray.length !== 0) {
            combinedArray.forEach(element => {
                let index = pages.findIndex(page => page.length < proposalCount && page[0].split('_')[0] !== element.split('_')[0]);
                if (index !== -1) {
                    pages[index].push(element);
                }
            });
        }
        return pages;
    }

    function checkLengths(arr, count) {
        let correct = true;
        arr.forEach(element => {
            if (element.length < count) {
                correct = false;
                return;
            }
        })
        return correct;
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
        let randomElement = pickAndRemoveRandomElement(compiledPages);
        let correctAnswer = randomElement[0].split('_')[0];
        $('#proposed_answer div').text(correctAnswer);

       let shuffled = shuffleArray(shuffleArray(shuffleArray(randomElement)));
       shuffled.forEach(element => {
            $('.secret-code-cards').append(`
            <div class="col align-items-center d-flex flex-column p-0 m-2" style="min-width: 20%;">
                <div class="activity4-3to6 d-flex justify-content-center align-items-center p-2">
                    <img src="./media/${dir}/${element}" alt="Image" class="responsive-img">
                </div>
                <div class="btn-379 btn-white-red btn m-2 px-2 proposed_part_of_code" data-correct="${element.split('_')[0] === correctAnswer ? 'true' : 'false'}">${Math.floor(Math.random() * 9) + 1}</div>
            </div>`);
       });
        
       const codeLength = parseInt(localStorage.getItem('age'));
       for (let i = 1; i <= codeLength; i++) {
        $('.secret-code').next().append(`
        <div class="col-4 d-flex justify-content-center">
            <input type="text" class="btn-379 btn-white-green" disabled>
        </div>`);
       }
    }

    let images;
    let compiledPages;
    let correctLength = false;
    while (correctLength === false) {
        images = imageFileNames(pronouns, number_of_images);
        
        let arraysLength;
        let proposalCount;
        if (localStorage.getItem('age') === '2') {
            arraysLength = 3;
            proposalCount = 3;
        } else {
            arraysLength = 4;
            proposalCount = 5;
        }
        compiledPages = compilePages(parseInt(localStorage.getItem('age')), proposalCount);
        correctLength = checkLengths(compiledPages, arraysLength);
    }

    render();
   
    $('.proposed_part_of_code').on('click', handleClick);

    function handleClick(e) {
        $this = e.currentTarget;
        $(this).off('click', handleClick);
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
            $('.proposed_part_of_code').off('click', handleClick);
            checkCode();
        }
    }

    function checkCode() {
        const elements = $('.proposed_part_of_code').filter(function() {
            return $(this).data('selected') === 'true';
        });
        console.log('sad');
        elements.each(function(index,value) {
            if ($(this).data('correct') === true && $($('input:text')[index]).val() === $(this).text()) {
                $($('input:text')[index]).addClass('correct animate__animated animate__bounce animate__slow');
            } else {
                $($('input:text')[index]).addClass('incorrect animate__animated animate__shakeX animate__slow');
            }
        });
        console.log(compiledPages);
        if (compiledPages.length > 0) {
            setTimeout(() => {
                $('input:text').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                $('input:text').val('');
                $('.proposed_part_of_code').removeData('selected');
                $('.proposed_part_of_code').removeData('correct');
                $('.secret-code-cards').empty();
                $('.secret-code').next().empty();
                render();
                setImageSizes();
                $('.proposed_part_of_code').on('click', handleClick);
            }, 2000);
        }
    }

    function setImageSizes() {
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
    }

    setImageSizes();
  
   
});

