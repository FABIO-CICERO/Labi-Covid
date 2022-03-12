import game from "./src/Game.js";

// MENSAGEM DO POP UP INCIAL
$(document).ready(function () {
  //Fade in delay for the background overlay (control timing here)

  if ($("#fase").val() == 1) {
    $("#bkgOverlay").delay(2400).fadeIn(400);
    //Fade in delay for the popup (control timing here)
    $("#delayedPopup").delay(2000).fadeIn(400);

    //Hide dialouge and background when the user clicks the close button
    $("#btnClose").click(function (e) {
      HideDialog();
      e.preventDefault();
    });
    $(".backgroundOverlay").click(function (e) {
      HideDialog();
      e.preventDefault();
    });
  } else {
    $("#delayedPopup").hide();
  }
});
//Controls how the modal popup is closed with the close button
function HideDialog() {
  $("#bkgOverlay").fadeOut(400);
  $("#delayedPopup").fadeOut(300);
}

// CODIGO DAS SETAS QUE APARECEM NO MOBILE
window.addEventListener("keyup", arrowUp);
window.addEventListener("keydown", arrowDown);

function arrowDown(e) {
  const key = document.querySelector(`.arrow-key[data-key="${e.keyCode}"]`);
  key.classList.add("press");
}
function arrowUp(e) {
  const key = document.querySelector(`.arrow-key[data-key="${e.keyCode}"]`);
  key.classList.remove("press");
}

// MUTAR TODOS OS SONS DA PAGINA
// function muted() {
//   // document.getElementById("volume").innerHTML = "Hello World";
//   gameOverSound.muted = true;
//   gameWinSound.muted = true;
// }

// let stopButton = document.querySelector("#gameCanvas");

// stopButton.onclik = () => {
//   gameOverSound.pause();
//   gameWinSound.pause();
// };

// ANIMAÇÃO DO ICONE DE MUTAR DESMUTAR SOM
$(document).ready(function () {
  $("#audio").click(function () {
    var audio = document.querySelector("#audio");

    // pega o status atual da class i (icone)
    var currentState = audio.getAttribute("class");

    // muda a class (icone) e muta o som 😅
    if (currentState === "fas fa-volume-mute") {
      audio.setAttribute("class", "fa fa-volume-up");
      game.gameOverSound.muted = false;
      game.gameWinSound.muted = false;
      game.pacman.eatGhostSound.muted = false;
      game.pacman.wakaSound.muted = false;
      game.pacman.powerDotSound.muted = false;
    } else {
      audio.setAttribute("class", "fas fa-volume-mute");
      game.gameOverSound.muted = true;
      game.gameWinSound.muted = true;
      game.pacman.eatGhostSound.muted = true;
      game.pacman.wakaSound.muted = true;
      game.pacman.powerDotSound.muted = true;
    }
  });
});