import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
// O ponto [.] significa que está no mesmo diretório, seguido por barra [/]

export default class Juca {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    // valor de movimentação
    this.currentMovingDirenction = null;
    this.requestedMovingDirection = null;

    this.pacmanAnimationTimerDefault = 10;
    this.pacmanAnimationTimer = null;

    this.pacmanRotation = this.Rotation.right;
    this.wakaSound = new Audio("sounds/waka.wav");
    // this.wakaSound.muted = true; //muta o som

    this.powerDotSound = new Audio("sounds/cura.wav");
    // this.powerDotSound.muted = true; //muta o som

    this.powerDotSoundActive = false;
    this.powerDotAboutToExpire = false;
    this.timers = [];

    this.eatGhostSound = new Audio("sounds/eat_ghost.wav");
    // this.eatGhostSound.muted = true; //muta o som

    //  let stopButton = document.querySelector("#muted");

    //  stopButton.onclik = ()=>{
    //  this.eatGhostSound.muted = true;
    //  this.powerDotSound.muted = true;
    //  }
    this.madeFirstMove = false;

    // Entrada de dados do teclado - TECLAS das setas
    document.addEventListener("keydown", this.#keydown);
    $("div.arrow-key").click(this.#keydown);

    // Colocando as imagens com  metodos privados
    this.#loadPacmanImages();
  }

  //variaveis da rotação das imagens
  Rotation = {
    right: 0,
    down: 3,
    left: 4,
    up: 3,
  };
  // desenhando o personagem
  draw(ctx, pause, enemies) {
    if (!pause) {
      this.#move();
      this.#animate(); //função de animação do personagem//
    }
    this.#eatDot(); //comer os pontos
    this.#eatPowerDot(); //comer a vacina
    this.#eatGhost(enemies);

    const size = this.tileSize / 2;
    //parte que faz a rotação do personagem de acordo com a direção atual
    ctx.save();
    ctx.translate(this.x + size, this.y + size);
    ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      -size,
      -size,
      this.tileSize,
      this.tileSize
    );

    ctx.restore();
    // ctx.drawImage(
    //   this.pacmanImages[this.pacmanImageIndex],
    //   this.x,
    //   this.y,
    //   this.tileSize,
    //   this.tileSize
    // );
  }
  // imagens do pacaman
  #loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = "images/personagem1.png";

    const pacmanImage2 = new Image();
    pacmanImage2.src = "images/personagem2.png";

    const pacmanImage3 = new Image();
    pacmanImage3.src = "images/personagem1.png";

    // const pacmanImage4 = new Image();
    // pacmanImage4.src = "../images/pac1.png";

    // criando uma array para imagens para linkar ao objeto
    this.pacmanImages = [
      pacmanImage1,
      pacmanImage2,
      pacmanImage3,
      pacmanImage2,
    ];

    // Muda a imagem(animaçao, no caso) se digitar 1 ou 2, muda
    this.pacmanImageIndex = 0;
  }
  //  funcao da seta - representa o pacman
  #keydown = (event) => {
    // seta para cima
    let keyCode = event.keyCode;

    if (!keyCode) {
      keyCode = $(event.currentTarget).data("key");
    }

    if (keyCode == 38) {
      // Analisa o pedido de mudaca de direção (se esta em baixo e com paredes do lado, so pode ir para cima)
      if (this.currentMovingDirenction == MovingDirection.down)
        this.currentMovingDirenction = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
      this.madeFirstMove = true;
    }
    // seta para baixo
    if (keyCode == 40) {
      if (this.currentMovingDirenction == MovingDirection.up)
        this.currentMovingDirenction = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
      this.madeFirstMove = true;
    }
    // seta para esquerda
    if (keyCode == 37) {
      if (this.currentMovingDirenction == MovingDirection.right)
        this.currentMovingDirenction = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
      this.madeFirstMove = true;
    }
    // seta para a direita
    if (keyCode == 39) {
      if (this.currentMovingDirenction == MovingDirection.left)
        this.currentMovingDirenction = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
      this.madeFirstMove = true;
    }
  };

  #move() {
    // checa quando pode mudar a direçao do pacman
    if (this.currentMovingDirenction !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        // detecção da colisão com a parede
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        )
          this.currentMovingDirenction = this.requestedMovingDirection;
      }
    }

    // checa se tem uma colisão (parede)
    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirenction
      )
    ) {
      this.pacmanAnimationTimer = null; //faz a animação do pacaman para quando chega em uma parede
      this.pacmanImageIndex = 1;
      return;
    }
    //checa se tem um movimento atual
    else if (
      this.currentMovingDirenction != null &&
      this.pacmanAnimationTimer == null
    ) {
      this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
    }

    // Estrutura caso para movimentacão e mudança de direção
    switch (this.currentMovingDirenction) {
      // y - representa o eixo horizontal
      case MovingDirection.up:
        this.y -= this.velocity;
        this.pacmanRotation = this.Rotation.up;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        this.pacmanRotation = this.Rotation.down;
        break;
      // x - representa o eixo horizontal
      case MovingDirection.left:
        this.x -= this.velocity;
        this.pacmanRotation = this.Rotation.left;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        this.pacmanRotation = this.Rotation.right;
        break;
    }
  }
  // função da animação do pacman
  #animate() {
    if (this.pacmanAnimationTimer == null) {
      return;
    }
    this.pacmanAnimationTimer--;
    if (this.pacmanAnimationTimer == 0) {
      this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
      this.pacmanImageIndex++;
      if (this.pacmanImageIndex == this.pacmanImages.length)
        this.pacmanImageIndex = 0;
    }
  }

  // comer os pontos
  #eatDot() {
    if (this.tileMap.eatDot(this.x, this.y)) {
      // toca a música
      this.wakaSound.play();
    }
  }

  #eatPowerDot() {
    if (this.tileMap.eatPowerDot(this.x, this.y)) {
      //toca o som quando come a pedra do poder
      this.powerDotSound.play();
      //inimigos vão se tornar azul
      this.powerDotActive = true;
      this.powerDotAboutToExpire = false;
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers = [];

      let powerDotTimer = setTimeout(() => {
        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
      }, 1000 * 6);

      this.timers.push(powerDotTimer);

      let powerDotAboutToExpireTimer = setTimeout(() => {
        this.powerDotAboutToExpire = true;
      }, 1000 * 3);

      this.timers.push(powerDotAboutToExpireTimer);
    }
  }

  #eatGhost(enemies) {
    if (this.powerDotActive) {
      // checa cada inimigo pra saber se está colidindo com o pacman
      const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
      collideEnemies.forEach((enemy) => {
        enemies.splice(enemies.indexOf(enemy), 1);
        this.eatGhostSound.play();
      });
    }
  }
}