const front = "frontCard";
const back = "backCard";

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

createCardsFromCharacters(characters);

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