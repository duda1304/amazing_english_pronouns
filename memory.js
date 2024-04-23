/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

$(document).ready(function () {
	const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const number_of_images = {
        'i' : 1,
        'you' : 2,
        'he' : 1,
        'she' : 1,
        'it' : 1,
        'we' : 1,
        'they' : 2
    };
	const french_pronouns = {
		'i_1' : 'je',
		'you_1' : 'tu',
		'he_1' : 'il',
		'she_1' : 'elle',
		'it_1' : '<small>choses<br> et animaux</small>',
		'we_1' : 'nous',
		'you_2' : 'vous',
		'they_1' : 'ils',
		'they_2' : 'elles'
	}

	function imageFileNames(pronouns, number_of_images) {
        let fileNames = [];
        pronouns.forEach(element => {
            for (let i = 1; i <= number_of_images[element]; i++) {
                fileNames.push(`${element}_${i}.png`);
            }
        });
        return fileNames;
    }    

	function pickAndRemoveRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const removedElement = arr.splice(randomIndex, 1)[0];
        return removedElement;
    };

	const all_images = imageFileNames(pronouns, number_of_images);
	const images =[];

	count = 1;
	while (count <= 9) {
		const randomElement = pickAndRemoveRandomElement(all_images);
		images.push({'src' : randomElement, 'text' : randomElement.split('_')[0]});
		let french_word = french_pronouns[randomElement.split('.')[0]];
		images.push({'src' : randomElement, 'text' : french_word});
		count += 1;
	}

	const $memoryContainer = $(".memory-container");
	let flippedCount = 0;
	let flippedCards = [];

	function createMemoryCard(index) {
		return (`<div class="col-2">
					<div class="memory-card card-image" data-index="${index}">
						<img src="./media/transparent.png" class="memory-game-image"></img>
						<p></p>
					</div>
				</div>`);
	}
	
	function renderMemoryCards() {
		images.forEach(function (_, index) {
			let memoryCardHTML = createMemoryCard(index);
			$memoryContainer.append(memoryCardHTML);
		});
	}

	function shuffleArray(array) {
		return array.sort(function () {
			return Math.random() - 0.5;
		});
	}

	function flipCard($card, index) {
		$card.css('background-image', "url('./media/memory-front.png')");
		$card.find('.memory-game-image').attr('src', `./media/1_2/${images[index]['src']}`);
		/////
		$card.find('p').html(images[index]['text']);
		$card.addClass("flipped");
		flippedCount++;
		flippedCards.push($card);
	}

	function resetFlippedCards() {
		flippedCards.forEach(function (card) {
			card.find('.memory-game-image').attr('src', './media/transparent.png');
			card.find('p').html('');
			card.css('background-image', "url('./media/memory-backside.png')");
			// card.find('img[src*="backside"]').show();
			// card.find('img[src*="front"]').hide();
			// card.html(
			// 	'<img src="./media/memory-backside.png" alt="Memory Card" class="card-image">'
			// );
			card.removeClass("flipped");
		});
		flippedCards = [];
	}

	function checkMatches() {
		if (flippedCount === 2) {
			const card1 = flippedCards[0];
			const card2 = flippedCards[1];
			const image1 = $(card1).find('.memory-game-image').attr('src');
			const image2 = $(card2).find('.memory-game-image').attr('src');
			
			if (image1 === image2) {
				flippedCards = [];
			} else {
				$memoryContainer.addClass("checking");
				setTimeout(function () {
					resetFlippedCards();
					$memoryContainer.removeClass("checking");
				}, 500);
			}
			flippedCount = 0;
		}
	}

	$memoryContainer.on("click", ".memory-card", function () {
		const $this = $(this);
		if (
			!$this.hasClass("flipped") &&
			flippedCount < 2 &&
			!$memoryContainer.hasClass("checking")
		) {
			const index = $this.data("index");
			flipCard($this, index);
			setTimeout(checkMatches, 500);
		}
	});

	renderMemoryCards();
	shuffleArray(images);

});
