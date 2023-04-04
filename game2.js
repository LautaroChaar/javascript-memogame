// Variables juego 2
let firstCardId = undefined;
let fullPokeball = [];
let cardsContainer = [];
let imgContainer = [];
let scorePokememoEasy = [];
let scorePokememoMedium = [];
let scorePokememoHard = [];
let accumulator = 0;
let id = 0;
let firstUrl = undefined;
let secondUrl = undefined;
let selectCards = 0;
let success = 0;
let pokemomeEasyRes;
let pokemomeMediumRes;
let pokemomeHardRes;

// Guardar score
const saveScorePokememo = () => {
  let dificulty = selectDifficulty();
  const playerName = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
  const playerData = JSON.parse((localStorage.getItem(playerName)));
  let newPlayerData;
  if (dificulty === "Fácil") {
    let scoreArray = playerData.score.scorePokememo.easy;
    let arrayElement = scorePokememoEasy.shift();
    scoreArray.push(arrayElement);
    let result = scoreArray.filter((item,index)=>{
      return scoreArray.indexOf(item) === index;
    })
    newPlayerData = {
      ...playerData,
      score: { ...playerData.score, scorePokememo: {...playerData.score.scorePokememo, easy: result}}
    } 
  } else if (dificulty === "Intermedio") {
    let scoreArray = playerData.score.scorePokememo.medium;
    let arrayElement = scorePokememoMedium.shift();
    scoreArray.push(arrayElement);
    let result = scoreArray.filter((item,index)=>{
      return scoreArray.indexOf(item) === index;
    })
    newPlayerData = {
      ...playerData,
      score: { ...playerData.score, scorePokememo: {...playerData.score.scorePokememo, medium: result}}
    }
  } else {
    let scoreArray = playerData.score.scorePokememo.hard;
    let arrayElement = scorePokememoHard.shift();
    scoreArray.push(arrayElement);
    let result = scoreArray.filter((item,index)=>{
      return scoreArray.indexOf(item) === index;
    })
    newPlayerData = {
      ...playerData,
      score: { ...playerData.score, scorePokememo: {...playerData.score.scorePokememo, hard: result}}
    }
  }
  localStorage.setItem(playerName, JSON.stringify(newPlayerData));
}

// Juego 2
const pokemonGame = async () => {
  mixElements();
  let dificulty = selectDifficulty();
  let totalElements;
  let totalPokemons;
  let totalPokemonsClon;

  if (dificulty === "Fácil") {
    totalPokemons = elements.slice(0, 4);
    totalPokemonsClon = totalPokemons;
    totalElements = elements.slice(0, 8);
  } else if (dificulty === "Intermedio") {
    totalPokemons = elements.slice(0, 7);
    totalPokemonsClon = totalPokemons;
    totalElements = elements.slice(0, 14);
  } else {
    totalPokemons = elements.slice(0, 10);
    totalPokemonsClon = totalPokemons;
    totalElements = elements.slice(0, 20);
  }
  
  let pokeball = totalPokemons.concat(totalPokemonsClon);
  pokeball.sort(() => Math.random() - 0.5);
  
    // Obtenemos las imagenes de los pokemons
  await Promise.all(
    pokeball.map((pokemon) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.json())
        .then((data) =>
          fullPokeball.push(data.sprites.other.dream_world.front_default)
        )
        .catch((e) => console.error(e))
    )
  );
  
  fullPokeball.sort(() => Math.random() - 0.5);
  // Creamos los elementos del juego 2
  for (element in totalElements) {
    let card = document.createElement("DIV");
    let frontCard = document.createElement("DIV");
    let backCard = document.createElement("DIV");
    let img = document.createElement("IMG");
    let pokeballImg = document.createElement("IMG");
    pokeballImg.setAttribute("class", "pokeballImg");
    card.setAttribute("class", "cardGame");
    card.setAttribute("id", `${accumulator++}`);
    frontCard.setAttribute("class", "frontCard");
    backCard.setAttribute("class", "backCard");
    img.setAttribute("id", `${id++}`);
    img.setAttribute("class", "pokeImg");
    img.setAttribute("src", fullPokeball[id - 1]);
    gameContainer.appendChild(card);
    card.appendChild(frontCard);
    frontCard.appendChild(pokeballImg);
    card.appendChild(backCard);
    backCard.appendChild(img);
    cardsContainer.push(card);
    imgContainer.push(img);
    startTime(stopTimer);
  }
  
  cardsContainer.forEach((card) => {
    card.addEventListener("click", selectFirstCard);
    card.addEventListener("click", selectSecondCard);
  
    function selectFirstCard() {
      if (!card.classList.contains("rotate") && selectCards === 0) {
        card.classList.add("rotate");
        card.classList.add("firstCard");
        firstCardId = card.id;
        imgContainer[card.id].classList.add("firstImg");
        firstUrl = imgContainer[card.id].src;
        selectCards++;
      }
    }
    function selectSecondCard() {
      if (!card.classList.contains("rotate") && selectCards === 1) {
        let cardId = document.getElementById(firstCardId);
        card.classList.add("rotate");
        card.classList.add("secondCard");
        imgContainer[card.id].classList.add("secondImg");
        secondUrl = imgContainer[card.id].src;
        movesAddition++;
        moves.innerHTML = `Movimientos: ${movesAddition}`;
        if (firstUrl != secondUrl) {
          setTimeout(() => {
            card.classList.remove("rotate");
            card.classList.remove("secondCard");
            cardId.classList.remove("rotate");
            cardId.classList.remove("firstCard");
          }, 800);
          selectCards = 0;
        } else {
          success++;
          selectCards = 0;
          if (success === totalPokemons.length) {
            dificulty === "Fácil" && scorePokememoEasy.push(movesAddition);
            dificulty === "Intermedio" && scorePokememoMedium.push(movesAddition);
            dificulty === "Difícil" && scorePokememoHard.push(movesAddition);
            win = true;
            saveScorePokememo();
            winTrophie();
          }
        }
      }
    }
  });
};