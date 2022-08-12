const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const highScoreBoard = document.querySelector('.high-score');
let lastHole;
let timeUp = false;
let score = 0;
let highOne = JSON.parse(localStorage.getItem('highOne') || 0);


function randomTime(max, min) {
    return Math.round(Math.random() * (max - min) + min);
} //random amount of time that the mole is gonna appear


function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        randomHole(holes);
    }

    
    lastHole = hole;
    return hole;
} //random the holes that the mole is gonna appear

function peep() {
    const time = randomTime(200, 1000); //200 millisec e 1sec
    const hole = randomHole(holes);
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
    hole.classList.add('up');

} //get the moles popping up

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false; 
    score = 0;
    peep();
    setTimeout(() => {
        populateHighScore(score); 
        timeUp = true  
    }, 10000);
}


function bonk(e) {
    if(!e.isTrusted) return; //cheater!
    score++;
    e.path[1].classList.remove('up');
    scoreBoard.textContent = score;
    getScore(score);
}

function getScore(score) {
    if(score > highOne) {
        highOne = score;
        localStorage.setItem('highOne', JSON.stringify(highOne));
    }
}

function populateHighScore(score){
    highScoreBoard.textContent = `${highOne}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
populateHighScore(score);