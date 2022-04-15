import game from "./src/Game.js";

//carrega tudo isso APÓS o Html carregar
$(document).ready(function () {
  // MENSAGEM DO POP UP INCIAL
    //Fade in delay for the background overlay (control timing here)
    if ($("#fase").val() == 1) {
      $("#bkgOverlay").delay(2500).fadeIn(400);
      //Fade in delay for the popup (control timing here)
      $("#delayedPopup").delay(2200).fadeIn(400);

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

  // ANIMAÇÃO DO ICONE DE MUTAR DESMUTAR SOM
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