/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

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
	const french_pronouns = {
		'i' : 'je',
		'you' : 'tu',
		'he' : 'il',
		'she' : 'elle',
		'it' : 'elle',
		'we' : 'nous',
		'You' : 'vous',
		'they' : 'ils/elles'
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
		let french_word = french_pronouns[randomElement.split('_')[0]];
		if (randomElement.includes('you_1') || randomElement.includes('you_2') || randomElement.includes('you_6')) {
			french_word = french_pronouns['You'];
		}
		images.push({'src' : randomElement, 'text' : french_word});
		count += 1;
	}

	const $memoryContainer = $(".memory-container");
	let flippedCount = 0;
	let flippedCards = [];

	function createMemoryCard(index) {
		return (`<div class="col-2">
					<div class="memory-card card-image" data-index="${index}">
						<img src="" class="memory-game-image"></img>
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
		$card.find('.memory-game-image').attr('src', `./media/1_1/${images[index]['src']}`);
		$card.find('p').text(images[index]['text']);
		$card.find('.memory-game-image').on('load', function() {
			const image_width = $(this).width();
			const image_height = $(this).height();
		
			const card_width = $(this).parent().width();
			const card_height = $(this).parent().height();
		
			const image_width_ratio = image_width/image_height;
			const image_height_ratio = card_height/card_width;

			const adjusted_height = 0.7*card_height;
		
			if (image_width_ratio*adjusted_height > 0.8*card_width) {
				$(this).width(0.8*card_width);
				// $(this).height(image_height_ratio*0.8*card_width);
			} 
		})
		
		$card.addClass("flipped");
		flippedCount++;
		flippedCards.push($card);
	}

	function resetFlippedCards() {
		flippedCards.forEach(function (card) {
			card.find('.memory-game-image').attr('src', './media/transparent.png');
			card.find('p').text('');
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
