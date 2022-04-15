import TileMap from "./TileMap.js";

// define o tamanho dos blocos
const tileSize = 32;
// define a velocidade do Pacman
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

let textOptionsWin = ["Boa! Você usou alcool em gel 🤩", "Parabéns, você venceu 🤗", "Foi por pouco hein! 😱", "✨ Você venceu a Pandemia ✨", "🎇 Tomou todas as vacinas hein 🎇"];
let textOptions = ["A Pandemia ainda não acabou 😮", "Parece que você não lavou as mãos! 🧼", "A Pandemia te pegou 😷"];

let text = " ";
let winMessage  = " ";
let subWinMessage  = " ";
let overMessage  = " ";
let subOverMessage  = " ";

var gameOverSound = new Audio("sounds/fim.wav"); //era const, mudar pra var para mudar o valor do som para true
var gameWinSound = new Audio("sounds/gameWin.wav");

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

//funcao aleatoria que mostra a mensagem de game over aleatoriamente
overMessage = textOptions[Math.floor(Math.random() * textOptions.length)];

//funcao aleatoria que mostra a mensagem de game win aleatoriamente
winMessage = textOptionsWin[Math.floor(Math.random() * textOptionsWin.length)];

function drawGameEnd() {
  //mensagens de venceu ou perdeu
  if (gameOver || gameWin) {
    subWinMessage = winMessage;
    //reescreve a variavel com o item aleatorio
    text = subWinMessage;
    
    if (gameOver) {  
      //insere o conteudo aleatorio da variavel 
      subOverMessage = overMessage;
      text = subOverMessage;

      //Função para quando perder em qualquer fase, ele retorna para a fase 1
      setTimeout(function () {
        if (tileMap.fase == 1) {
          /*parametros passados pela URL, chama a nova fase(mapa)*/
          location.href = "/Labi-Covid/?fase=1"; // /Labi-Covid(Pasta) *passar para url o caminho*
        } else if (tileMap.fase == 2) {
          location.href = "/Labi-Covid/?fase=1";
        } else if (tileMap.fase == 3){
          location.href = '/Labi-Covid/?fase=1';
        }
        else if (tileMap.fase == 4){
          location.href = '/Labi-Covid/?fase=1';
        } else if(tileMap.fase == 5) {
          location.href = '/Labi-Covid/?fase=1';}
      }, 2250);
    }

    ctx.fillStyle = "#2215d6";
    ctx.fillRect(0, canvas.height / 4, canvas.width, 190); //canvas text gradientes

    ctx.font = "28px Comic Neue";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "#fff");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 20, canvas.height / 2.2);

    if (gameWin) {
      setTimeout(function () {
        if (tileMap.fase == 1) {
          /*parametros passados pela URL, chama a nova fase(mapa)*/
          location.href = "/Labi-Covid/?fase=2"; // /Labi-Covid(Pasta) *passar para url o caminho*
        } else if (tileMap.fase == 2) {
          location.href = "/Labi-Covid/?fase=3";
        } else if (tileMap.fase == 3){
          location.href = '/Labi-Covid/?fase=4';
        } else if(tileMap.fase == 4) {
          location.href = '/Labi-Covid/?fase=5';
        }
      }, 1200); //Delay da troca de fase
    }
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);

export default { /*exportando as classes para o script.js cancelar os sons*/
  gameOverSound,
  gameWinSound,
  pacman,
};