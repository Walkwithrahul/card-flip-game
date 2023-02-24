const cards = document.querySelectorAll('.card'); // selecting the card

const greeting = document.getElementById('greeting');

// declaring matchCard variable to use it as a condition to reset the game
let matchedCard = 0;

// initializing the two cards, which gonna take big part
let cardOne, cardTwo;

let disableDeck = false;


const flipCard = (e) => {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip');
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector('img').src,
            cardTwoImg = cardTwo.querySelector('img').src;
        matchCard(cardOneImg, cardTwoImg);
    };
};

const matchCard = (img1, img2) => {
    if (img1 === img2) {
        matchedCard++;
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return disableDeck = false;
    }


    // if 2 cards are not matched

    setTimeout(() => {  //adding shake
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 300);


    // removing both flip and shake after 1.2 seconds

    setTimeout(() => {
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        cardOne = cardTwo = ''; // setting both cards value to emoty string
        disableDeck = false;
    }, 1200);
}


cards.forEach(card => { // adding event listener to all cards 
    card.addEventListener('click', flipCard)
})

function shuffleCards() {
    matchedCard = 0;
    cardOne = cardTwo = '';

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > .5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.addEventListener('click', flipCard);
        let imgTag = card.querySelector('img');
        imgTag.src = `./img-${arr[index]}.png`;
        card.classList.remove('flip')
    });
};

const resetButton = document.getElementById('reset-button');


resetButton.addEventListener('click', shuffleCards);

shuffleCards();