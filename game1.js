// Variables juego 1
let gameNumbers = [];
let uncoverNumber = 0;
let scoreNumbersEasy = [];
let scoreNumbersMedium = [];
let scoreNumbersHard = [];
let numbersEasyRes;
let numbersMediumRes;
let numbersHardRes;

// Guardar score
const saveScoreNumbers = () => {
  let dificulty = selectDifficulty();
  const playerName = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
  const playerData = JSON.parse((localStorage.getItem(playerName)));
  let newPlayerData;
  if (dificulty === "Fácil") {
    let scoreArray = playerData.score.scoreNumbers.easy;
    let arrayElement = scoreNumbersEasy.shift();
    scoreArray.push(arrayElement);
    let result = scoreArray.filter((item,index)=>{
      return scoreArray.indexOf(item) === index;
    })
    newPlayerData = {
      ...playerData,
      score: { ...playerData.score, scoreNumbers: {...playerData.score.scoreNumbers, easy: result}}
    } 
  } else if (dificulty === "Intermedio") {
    let scoreArray = playerData.score.scoreNumbers.medium;
    let arrayElement = scoreNumbersMedium.shift();
    scoreArray.push(arrayElement);
    let result = scoreArray.filter((item,index)=>{
      return scoreArray.indexOf(item) === index;
    })
    newPlayerData = {
      ...playerData,
      score: { ...playerData.score, scoreNumbers: {...playerData.score.scoreNumbers, medium: result}}
    }
  } else {
    let scoreArray = playerData.score.scoreNumbers.hard;
    let arrayElement = scoreNumbersHard.shift();
    scoreArray.push(arrayElement);
    let result = scoreArray.filter((item,index)=>{
      return scoreArray.indexOf(item) === index;
    })
    newPlayerData = {
      ...playerData,
      score: { ...playerData.score, scoreNumbers: {...playerData.score.scoreNumbers, hard: result}}
    }
  }
  localStorage.setItem(playerName, JSON.stringify(newPlayerData));
}

// Programamos el juego en base a su dificultad
// Juego 1
const numberGame = () => {
  mixElements();
  let dificulty = selectDifficulty();
  let totalNumbers;

  if (dificulty === "Fácil") {
    totalNumbers = elements.slice(0, 8);
  } else if (dificulty === "Intermedio") {
    totalNumbers = elements.slice(0, 14);
  } else {
    totalNumbers = elements.slice(0, 20);
  }

  // Creamos los elementos del juego 1
  for (number in totalNumbers) {
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "btnGame");
    button.setAttribute("id", Number(number) + 1);
    gameContainer.appendChild(button);
    gameNumbers.push(button);
  }

  // Creamos un array con los botones generados y los distribuimos aleatoriamente
  gameNumbers.sort(() => Math.random() - 0.5);

  // Mostramos el numero oculto en cada boton por unos segundos
  gameNumbers.forEach((btn, idex) => {
    btn.innerHTML = idex + 1;
    btn.disabled = true;
    if (dificulty === "Fácil") {
      setTimeout(() => {
        btn.innerHTML = " ";
        btn.disabled = false;
        startTime(stopTimer);
      }, 5000);
    } else if (dificulty === "Intermedio") {
      setTimeout(() => {
        btn.innerHTML = " ";
        btn.disabled = false;
        startTime(stopTimer);
      }, 11000);
    } else {
      setTimeout(() => {
        btn.innerHTML = " ";
        btn.disabled = false;
        startTime(stopTimer);
      }, 17000);
    }

    // Mostramos el numero al hacer click en el boton
    btn.addEventListener("click", uncover);
    function uncover() {
      let n = gameNumbers.indexOf(btn);
      btn.innerHTML = parseInt(n) + 1;
      movesAddition++;
      moves.innerHTML = `Movimientos: ${movesAddition}`;

      // Logica del juego
      let acum = 1;
      if (uncoverNumber + acum == btn.innerHTML) {
        uncoverNumber++;
        btn.style.color = "#3da73d";
        btn.disabled = true;
        if (uncoverNumber == gameNumbers.length) {
          dificulty === "Fácil" && scoreNumbersEasy.push(movesAddition);
          dificulty === "Intermedio" && scoreNumbersMedium.push(movesAddition);
          dificulty === "Difícil" && scoreNumbersHard.push(movesAddition);
          win = true;
          saveScoreNumbers();
          winTrophie();
          uncoverNumber = 0;
        }
      } else {
        btn.style.color = "rgb(167 61 61)";
        setTimeout(function () {
          btn.innerHTML = " ";
        }, 800);
      }
    }
  });
};

