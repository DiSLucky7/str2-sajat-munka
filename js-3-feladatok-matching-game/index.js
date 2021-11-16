'use strict'

// -----CARDS-----
const container = document.querySelector('.cards__container');
let cards;
const iconsArray = [
    '<i class="fa fa-home" aria-hidden="true"></i>',
    '<i class="fa fa-anchor"></i>',
    '<i class="fa fa-camera-retro" aria-hidden="true"></i>',
    '<i class="fa fa-car" aria-hidden="true"></i>',
    '<i class="fa fa-diamond" aria-hidden="true"></i>',
]
let iconsArrayRandomized = [...iconsArray, ...iconsArray];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(iconsArrayRandomized);

function generatingCards() {
    for (let i = 0; i < iconsArrayRandomized.length; i++) {
        const card = `<div class="card">
        <div class="card__inner">
            <div class="card__front">
            </div>
            <div class="card__back">
                ${iconsArrayRandomized[i]}
            </div>
        </div>
        </div>`

        container.insertAdjacentHTML("afterbegin", card);
    }
    cards = document.querySelectorAll('.card')
}
generatingCards();

// Add and remove classes.
const addClass = (element, className) => {
    element.classList.add(className);
};

const removeClass = (element, className) => {
    element.classList.remove(className);
};

// -----INSTRUCTION MESSAGE-----
const instructionMessage = document.querySelector('h3');

function instructionHidden() {
    addClass(instructionMessage, 'hidden');
}

function instructionVisible() {
    removeClass(instructionMessage, 'hidden');
}

// ------CLOCK------
const minutesLabel = document.querySelector('.min');
const secondsLabel = document.querySelector('.sec');
let totalSeconds = 0;

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = timeFormatter(totalSeconds % 60);
    minutesLabel.innerHTML = timeFormatter(parseInt(totalSeconds / 60));
}

let clicked = false;
let timer;
function handleClick() {
    clicked = true;
    timer = setInterval(setTime, 1000);
}

function startTimer() {
    if (!clicked) {
        handleClick();
    } 
}

function timeFormatter(value) {
    let valueString = value + "";
    if (valueString.length < 2) {
        return "0" + valueString;
    } else {
        return valueString;
    }
};


// -----FLIPPING CARDS-----
const cannotBeClicked = () => {
    cards.forEach((item, index) => addClass(cards[index], 'cannot-be-clicked'));
};

const canBeClicked = () => {
    cards.forEach((item, index) => removeClass(cards[index], 'cannot-be-clicked'));
};

let flipCounter = 0;
let lastClickedCard;
let correctFlipCounter = 0;

function setInitialValues() {
    flipCounter = 0;
    correctFlipCounter = 0;
    clicked = false;
    totalSeconds = 0;
    secondsLabel.innerHTML = timeFormatter(totalSeconds % 60);
    minutesLabel.innerHTML = timeFormatter(parseInt(totalSeconds / 60));
}
setInitialValues();

function cardEventListener() {
    cards.forEach(card => card.addEventListener('click', () => {
        instructionHidden();
        startTimer();        
        addClass(card.children[0], 'rotate');
        if (flipCounter === 0) {
            lastClickedCard = card;
            flipCounter++;
        } else if (flipCounter === 1) {
            const class1 = card.children[0].children[1].children[0].classList[1];
            const class2 = lastClickedCard.children[0].children[1].children[0].classList[1];
            flipCounter = 0;
            if (class1 === class2) {
                addClass(card, 'cannot-be-clicked-anymore')
                addClass(lastClickedCard, 'cannot-be-clicked-anymore')
                correctFlipCounter++;
            } else {
                cannotBeClicked();
                setTimeout(() => {
                    removeClass(card.children[0], 'rotate');
                    removeClass(lastClickedCard.children[0], 'rotate');
                    canBeClicked();
                }, 1500)
            }
        }
        if (correctFlipCounter === 5) endGame();   
    }));
}
cardEventListener();


// -----END GAME-----
function endGame() {
    cannotBeClicked();
    clearInterval(timer);
    setTimeout(() => {
        cards.forEach(card => removeClass(card.children[0], 'rotate'));
        setTimeout(() => {
            newGame();
        }, 400)
    }, 5000)
}

// -----REMOVE CARDS-----
function removeCards() {
    cards.forEach(card => card.remove())
}

// -----NEW GAME-----
function newGame() {
    removeCards();
    generatingCards();
    instructionVisible();
    shuffleArray(iconsArrayRandomized);
    canBeClicked();
    setInitialValues();
    cardEventListener();
}
