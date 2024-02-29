/*****score board Intial ******/
let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
}

/***** score board update ******/
updateScoreElement();

/***** Button functions ******/

// Rock btn
document.querySelector('.js-rock')
.addEventListener('click',()=>{
    playGame('rock');
});

// Paper btn
document.querySelector('.js-paper')
.addEventListener('click',()=>{
    playGame('paper');
});

// Scissor btn
document.querySelector('.js-scissor')
.addEventListener('click',()=>{
    playGame('scissor');
});

//Reset Game
document.querySelector('.reset-btn')
.addEventListener('click',()=>{
    resetGame();
});

// Auto Game
document.querySelector('.auto-btn')
.addEventListener('click',()=>{
    autoGame();
});

/**** Keyboard shortcuts to play, stop and reset the game ****/

document.body
.addEventListener('keydown',(event)=>{
    if (event.key === 'r'){
      playGame('rock');
    } else if (event.key === 'p'){
      playGame('paper');
    } else if (event.key === 's'){
      playGame('scissor');
    } else if (event.key === 'x'){
      resetGame();
    } else if (event.key === 'a'){
      autoGame();
    } 
});


function playGame(playerMove){

  const computerMove = pickComputerMove();
    
  let result = '';

  //rock
  if (playerMove === 'rock') {

    if (computerMove ==='rock') {
      result = `It's a tie`;
    } else if (computerMove ==='paper') {
      result = 'You lose';
    } else if (computerMove ==='scissor') {
      result = 'You win';
    }

  } 
  //paper
  else if (playerMove == 'paper'){ 

    if (computerMove ==='rock') {
      result = 'You win';
    } else if (computerMove ==='paper') {
      result =  `It's a tie`;
    } else if (computerMove ==='scissor') {
      result = 'You lose';
    }

  } 
  // Scissor
  else if(playerMove === 'scissor'){

    if (computerMove ==='rock') {
      result = 'You lose';
    } else if (computerMove ==='paper') {
      result =  'You win';
    } else if (computerMove ==='scissor') {
      result = `It's a tie`;
    }

  }

  //score board result
  if(result === 'You win') {
    score.wins +=1;
  } else if (result === 'You lose'){
    score.losses +=1;
  } else if (result === `It's a tie`){
    score.ties +=1;
  }
  
  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
  .innerHTML = result;

  document.querySelector('.js-moves')
  .innerHTML =`You <img class="icon" src="img/${playerMove}-emoji.png"> - <img class="icon" src="img/${computerMove}-emoji.png"> Computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML =`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

//NPC moves
function pickComputerMove () {
  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove ='rock';
  } else if ( randomNumber>= 1/3 && randomNumber < 2 /3) {
    computerMove ='paper';
  } else if ( randomNumber>= 2/3 && randomNumber < 1) {
    computerMove ='scissor';
  }
  
  return computerMove;
}


// Autoplay

let isAuto = false;
let intervalId ;

const autoBtn = document.getElementById('auto');

function autoGame(){ // we could create a arrow function here but this function syntax enables hoisting so this syntax is preferred

  if (!isAuto){

    intervalId= setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove); 
    }, 1000);

    isAuto = true;

  } else {

    clearInterval(intervalId);
    isAuto = false;

  }
};

//Reset Game
const resetBtn = document.getElementById('reset');

 function resetGame(){
  if(isAuto){

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');
    updateScoreElement();

    clearInterval(intervalId);
    isAuto = false;

  } else {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');
    updateScoreElement();

  }
} 