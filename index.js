// General
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const logoutButton = document.getElementById("logoutButton");
const typeOfGameSelection = document.getElementById("typeOfGame");
selectTypeOfGame = () => typeOfGameSelection.selectedOptions[0].value;
const difficultySelection = document.getElementById("dificultad");
selectDifficulty = () => difficultySelection.selectedOptions[0].value;
const gameContainer = document.getElementById("gameContainer");
const instructionContainer = document.getElementById("instructionsContainer");
const moves = document.getElementById("moves");
const showTime = document.getElementById("time");
const greeting = document.getElementById("greeting");
const trophieButton = document.getElementById("victoriesBtn");

// Timer
function startTime(stopTimer) {
  let min = 0;
  let seg = 0;
  stopTimer = setInterval(function () {
    seg++;
    showTime.innerHTML = `Tiempo: ${min} min ${seg} seg`;
    if (seg == 60) {
      seg = 0;
      min++;
    }
    if (win === true || clearTimer === true) {
      clearInterval(stopTimer);
      showTime.innerHTML = `Tiempo: 0 min 0 seg`;
    }
  }, 1000);
}

// Info victorias
function infoVictories() {
  trophieButton.addEventListener("click", info);

  function info() {
    const playerName = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
    const playerData = JSON.parse(localStorage.getItem(playerName));
    const numbersInfoEasy = playerData.score.scoreNumbers.easy;
    const numbersInfoMedium = playerData.score.scoreNumbers.medium;
    const numbersInfoHard = playerData.score.scoreNumbers.hard;
    const pokememoInfoEasy = playerData.score.scorePokememo.easy;
    const pokememoInfoMedium = playerData.score.scorePokememo.medium;
    const pokememoInfoHard = playerData.score.scorePokememo.hard; 
    numbersInfoEasy.length < 1 ? numbersEasyRes = playerData.score.scoreNumbers.easy : numbersEasyRes = Math.min(...playerData.score.scoreNumbers.easy);
    numbersInfoMedium.length < 1 ? numbersMediumRes = playerData.score.scoreNumbers.medium : numbersMediumRes = Math.min(...playerData.score.scoreNumbers.medium);
    numbersInfoHard.length < 1 ? numbersHardRes = playerData.score.scoreNumbers.hard : numbersHardRes = Math.min(...playerData.score.scoreNumbers.hard);
    pokememoInfoEasy.length < 1 ? pokemomeEasyRes = playerData.score.scorePokememo.easy : pokemomeEasyRes = Math.min(...playerData.score.scorePokememo.easy);
    pokememoInfoMedium.length < 1 ? pokemomeMediumRes = playerData.score.scorePokememo.medium : pokemomeMediumRes = Math.min(...playerData.score.scorePokememo.medium);
    pokememoInfoHard.length < 1 ? pokemomeHardRes = playerData.score.scorePokememo.hard : pokemomeHardRes = Math.min(...playerData.score.scorePokememo.hard);

    Swal.fire({
      title: 'Estadísticas',
      color: '#8b8b8b',
      html: `
      <p class="trofeos">Has ganado <span>${playerData.trophies}</span> trofeos</p>
      <p class="scoreTitle">Mejor score Numbers</p>
      <div class="dificulty">
      <p>Fácil: <span>${numbersEasyRes}</span></p><p> Intermedio: <span>${numbersMediumRes}</span></p><p> Difícil: <span>${numbersHardRes}</span></p>
      </div>
      <p class="scoreTitle">Mejor score Pokememo</p>
      <div class="dificulty">
      <p>Fácil: <span>${pokemomeEasyRes}</span></p><p> Intermedio: <span>${pokemomeMediumRes}</span></p><p> Difícil: <span>${pokemomeHardRes}</span></p>
      </div>
      `,
      background: '#1b1a21',
      confirmButtonText: 'Volver a la sala :)',
      confirmButtonColor: '#2a2731'
    });
  }
}

// alert juego 1
const winAlert1 = () => {
  const playerName = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
  setTimeout(function () {
    Swal.fire({
      title: 'GANASTE!',
      text: `Felicitaciones ${playerName}`,
      color: '#c59938',
      imageUrl: './trofeo.jpg',
      background: '#1b1a21',
      confirmButtonText: 'Obtener trofeo',
      confirmButtonColor: '#2a2731'
    });
    restart()
  }, 500); 
}

// alert juego 2
const winAlert2 = () => {
  const playerName = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
  setTimeout(function () {
    Swal.fire({
      title: 'GANASTE!',
      text: `Felicitaciones ${playerName}`,
      color: '#c59938',
      imageUrl: './pikachu.jpg',
      background: '#1b1a21',
      confirmButtonText: 'Obtener trofeo',
      confirmButtonColor: '#2a2731'
    });
    restart()
  }, 500);  
}

// Contar victorias
function winTrophie() {
  let game = selectTypeOfGame();
  const playerName = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
  const playerData = JSON.parse(localStorage.getItem(playerName));
  const newPlayerData = {
    ...playerData,
    trophies: Number(playerData.trophies + 1),
  };
  localStorage.setItem(playerName, JSON.stringify(newPlayerData));
  moves.innerHTML = `Movimientos: 0`;
  game === "Numbers" ? winAlert1() : winAlert2();
}

// Reiniciar juego
restartButton.addEventListener("click", restart);

function restart() {
  clearTimer = true;
  gameContainer.innerHTML = "";
  gameNumbers = [];
  elements = [];
  uncoverNumber = 0;
  movesAddition = 0;
  fullPokeball = [];
  cardsContainer = [];
  imgContainer = [];
  accumulator = 0;
  id = 0;
  success = 0;
  showTime.innerHTML = `Tiempo: 0 min 0 seg`;
  moves.innerHTML = `Movimientos: 0`;
  startButton.addEventListener("click", createGame);
}

// Variables compartidas por ambos juegos
let win;
let movesAddition = 0;
let stopTimer;
let clearTimer;
let elements;

// Array de elementos
function mixElements() {
  elements = [];
  for (let i = 1; i <= 150; i++) {
    elements.push(i);
    elements.sort(() => Math.random() - 0.5);
  }
}

// Generamos el juego en la pantalla
startButton.addEventListener("click", createGame);

function createGame() {
  win = false;
  clearTimer = false;
  let game = selectTypeOfGame();
  game === "Numbers" ? numberGame() : pokemonGame();
  startButton.removeEventListener("click", createGame);
}

