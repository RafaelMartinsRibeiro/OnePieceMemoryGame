let gameStarted = false;
let timerInterval = null;
let hh = 0;
let mm = 0;
let ss = 0;

startGame();

function startGame(){
    initializeCards(game.createCardsFromCharacters());
}

function initializeCards(cards){
    let gameBoard = document.querySelector("#gameBoard");
    let gameOverLayer = document.querySelector('#gameOver');

    gameBoard.innerHTML = '<h1>One piece MemoryGame</h1>';
    
    gameOverLayer.innerHTML = `<div>Congratulations! you finished the game</div> 
                               <button id="restart" onclick="restart()">New game</button>`

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

    if(!gameStarted){
        startTimer();
    }

    if(game.setCard(this.id)){
        this.classList.add("flip"); 

        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();

                if(game.gameOver()){
                    let gameOverLayer = document.querySelector('#gameOver');
                    let timerLayer = `<div id="gameOverTimer">Your time: ${(hh < 10 ? '0' + hh: hh)}:${(mm < 10 ? '0' + mm: mm)}:${(ss < 10 ? '0' + ss: ss)}</div>`;

                    gameOverLayer.style.display = 'flex';

                    stopTimer();
                    gameOverLayer.innerHTML += timerLayer;
                }
            }else{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
                
                setTimeout(() =>{
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000)
            }
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

function restart(){
    let gameOverLayer = document.querySelector('#gameOver');
    gameOverLayer.style.display = 'none';
    gameStarted = false;

    game.clearCards();
    stopTimer();
    startGame();
}

function startTimer(){
    gameStarted = true;

    timerInterval = setInterval(() =>{
        ss++

        if(ss == 60){
            ss = 0;
            mm++

            if(mm == 60){
                mm = 0;
                hh++
            }
        }

        let timerLayer = (hh < 10 ? "0" + hh: hh) + ":" + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss: ss)
    
        let timer = document.querySelector('#timer');
        timer.innerText = timerLayer;
    }, 1000)

}

function stopTimer(){
    clearInterval(timerInterval);
    hh = 0;
    mm = 0;
    ss = 0; 

    let timerLayer = (hh < 10 ? "0" + hh: hh) + ":" + (mm < 10 ? "0" + mm: mm) + ":" + (ss < 10 ? "0" + ss: ss)
    
    let timer = document.querySelector('#timer');
    timer.innerText = timerLayer;
}

