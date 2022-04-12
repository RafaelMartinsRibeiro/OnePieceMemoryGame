'use strict'

let game = {
    characters: [
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
    ],

    cards: null,

    createCardsFromCharacters: function(){
        this.cards = [];

        this.characters.forEach((char) =>{
            this.cards.push(this.createPairFromCharacters(char));
        })

        this.cards = this.cards.flatMap(pair => pair); 
        this.shuffleCards();

        return this.cards
    },

    createPairFromCharacters: function(char){
        return [{
            id: this.createIdChar(char),
            icon: char,
            flipped: false,
        },
        {
            id: this.createIdChar(char),
            icon: char,
            flipped: false,
        }]
    },
    
    createIdChar: function(char){
        return char + parseInt(Math.random() * 1000);
    },

    shuffleCards: function(){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while (currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
          
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}

