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

startGame();

function startGame(){
    cards = createCardsFromCharacters(characters);
    shuffleCards(cards);
    initializeCards(cards);
}

function createCardsFromCharacters(characters){
    let cards = [];

    for(let char of characters){
        cards.push(createPairFromCharacters(char));
    }

    return cards.flatMap(pair => pair);
}

function shuffleCards(cards){
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
      
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

function initializeCards(cards){
    let gameBoard = document.querySelector("#gameBoard");

    cards.forEach(card =>{
        let cardElement = document.createElement("div");

        cardElement.addEventListener("click", flipCard);

        cardElement.id = card.id;
        cardElement.classList.add("card");
        cardElement.dataset.icon = card.icon;        

        gameBoard.appendChild(cardElement);

        createCardContent(card, cardElement);
    })
}

function flipCard(){
    this.classList.add("flip");
}

function createCardContent(card, cardElement){
    createCardFace("frontCard", card, cardElement);
    createCardFace("backCard", card, cardElement);
}

function  createCardFace(face, card, cardElement){
    let cardElementFace = document.createElement("div");

    cardElementFace.classList.add(face);

    if(face == "frontCard"){
        let iconElement = document.createElement("img");

        iconElement.classList.add("icon");
        iconElement.src = `./assets/images/${card.icon}.png`;

        cardElementFace.appendChild(iconElement);
    }else{
        let iconElement = document.createElement("img");
        
        iconElement.src = "./assets/images/logo.png";

        cardElementFace.appendChild(iconElement);
    }

    cardElement.appendChild(cardElementFace);
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
    }];
}

function createIdChar(char){
    return char + parseInt(Math.random() * 1000);
}