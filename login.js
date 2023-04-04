const loginBtn = document.getElementById("login");

// Login
loginBtn.addEventListener("click", login);

function login() {
  const name = document.getElementById("playerName").value.trim();
  if (name !== "") {
    goPlayroom();
    localStorage.setItem(STORAGE_KEYS.USER_LOGGED_IN, name);
    const playerData = localStorage.getItem(name);
    greeting.innerHTML = `${name}`;
    if (playerData === null) {
      localStorage.setItem(
        name,
        JSON.stringify({
          name,
          trophies: 0,
          score: {
            scoreNumbers: {easy: [], medium: [], hard: []},
            scorePokememo: {easy: [], medium: [], hard: []}
          }
        })
      );
    }
    infoVictories();
  }
}

// Ir a la sala de juego
function goPlayroom() {
  instructionContainer.style.display = "none";
}

// Logout
logoutButton.addEventListener("click", playerlogout);

function playerlogout() {
  localStorage.removeItem(STORAGE_KEYS.USER_LOGGED_IN);
  location.reload();
}

// Validar sesion de jugador
function session() {
  const user = localStorage.getItem(STORAGE_KEYS.USER_LOGGED_IN);
  greeting.innerHTML = `${user}`;
  user !== null && goPlayroom();
  infoVictories();
}
