startGame();

function startGame(){
    initializeCards(game.createCardsFromCharacters());
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

    if(game.setCard(this.id)){
        this.classList.add("flip"); 

        if(game.checkMatch()){
            game.clearCards();
        }else{
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);
            setTimeout(() =>{
                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.clearCards();
            }, 1000)
        }
    }
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