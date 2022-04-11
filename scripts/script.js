const front = "frontCard";
const back = "backCard";
const gameBoard = document.querySelector("#gameBoard");

let characters = [
    'ace',
    'brook',
    'chopper',
    'franky',
    'kuzan',
    'luffy',
    'sanji',
    'shanks',
    'usopp',
    'zoro'
];

let cards = null;
startGame()

function startGame(){
    cards = createCardsFromCharacters(characters);
    shuffleCards(cards)
}


function shuffleCards(cards){
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
      
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function createCardsFromCharacters(characters){
    let cards = [];

    for(let char of characters){
        cards.push(createPairFromCharacters(char));
    }

    return cards.flatMap(pair => pair);
}

function createPairFromCharacters(char){
    return [{
        id: createIdChar(char),
        icon: char,
        flipped: false
    },
    {
        id: createIdChar(char),
        icon: char,
        flipped: false
    }]
}

function createIdChar(char){
    return char + parseInt(Math.random() * 1000);
}