/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

$(document).ready(function () {
	const images = [
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-I.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
		"./media/memory-je.svg",
	];

	const pairs = {
		"./media/memory-I.svg": "./media/memory-je.svg",
		"./media/memory-je.svg": "./media/memory-I.svg",
	};

	const $memoryContainer = $(".memory-container");
	let flippedCount = 0;
	let flippedCards = [];

	function createMemoryCard(index) {
		return (
			'<div class="col-md-2">' +
			'<div class="memory-card" data-index="' +
			index +
			'">' +
			'<img src="./media/memory-backside.svg" alt="Memory Card" class="card-image">' +
			"</div>" +
			"</div>"
		);
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
		$card.html(
			'<img src="' + images[index] + '" alt="Memory Card" class="card-image">'
		);
		$card.addClass("flipped");
		flippedCount++;
		flippedCards.push($card);
	}

	function resetFlippedCards() {
		flippedCards.forEach(function (card) {
			card.html(
				'<img src="./media/memory-backside.svg" alt="Memory Card" class="card-image">'
			);
			card.removeClass("flipped");
		});
		flippedCards = [];
	}

	function checkMatches() {
		if (flippedCount === 2) {
			const card1 = flippedCards[0];
			const card2 = flippedCards[1];
			const index1 = card1.data("index");
			const index2 = card2.data("index");
			const pair1 = images[index1];
			const pair2 = images[index2];

			if (pairs[pair1] === pair2 || pairs[pair2] === pair1) {
				flippedCards = [];
			} else {
				$memoryContainer.addClass("checking");
				setTimeout(function () {
					resetFlippedCards();
					$memoryContainer.removeClass("checking");
				}, 1000);
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
