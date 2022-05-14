import Juca from "./Juca.js";
import MovingDirection from "./MovingDirection.js";
import Enemy from "./Enemy.js";

// Imagens do mapa (parede, pontos)
export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.yellowDot = new Image();
    this.yellowDot.src = "images/alcool.png";

    this.pinkDot = new Image();
    this.pinkDot.src = "images/vacina.png";

    this.wall = new Image();
    this.wall.src = "images/parede1.png";

    this.powerDot = this.pinkDot;
    this.powerDotAnimationTimerDefault = 50; /*velocidade da animacao da vacina*/
    this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    this.fase = 1;

    /*
    1 é Parede
    0 é alcool em gel
    4 é o Personagem
    5 espaço vazio
    6 covid
    7 vacina*/

    //13x11 fase 1
    this.map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 7, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 7, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    var query = window.location.search.substring(1);

    if (query) {
      var qs = this.parse_query_string(query);

      if (qs.fase) {
        this.fase = qs.fase;
      }

      if (this.fase == 2) {

        //imagem parede fase 2
        this.wall.src = "images/parede2.png";

        //17x15 fase 2 (6 inimigos - 3 vacinas)
        this.map = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 6, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 7, 6, 1],
          [1, 0, 1, 5, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 1, 1, 6, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 0, 1, 7, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
          [1, 0, 1, 0, 1, 0, 0, 0, 1, 4, 1, 6, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 6, 1, 0, 1, 0, 0, 6, 1, 5, 1, 0, 1],
          [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 7, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
      } else if (this.fase == 3) {

        //imagem parede fase 3
        this.wall.src = "images/parede3.png";

        //19x16 fase 3 (7 inimigos - 4 vacinas)
        this.map = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 7, 0, 0, 0, 6, 1],
          [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 5, 1, 0, 1],
          [1, 6, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 1, 0, 0, 6, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 6, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 5, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 7, 1, 0, 1],
          [1, 0, 1, 1, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
          [1, 0, 7, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
          [1, 0, 0, 6, 0, 0, 0, 0, 7, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
      } else if (this.fase == 4) {
    
        // imagem parede fase 4
        this.wall.src = "images/parede4.png";

        //22x18 fase 4 (10 inimigos - 3 vacinas)
        this.map = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 6, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 1, 5, 5, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 7, 0, 1, 0, 1, 0, 1, 5, 5, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 6, 0, 1],
          [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 6, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 7, 1, 0, 1, 1, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 4, 1, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 6, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
          [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 7, 0, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
      }else if (this.fase == 5){

        // imagem parede fase 5
        this.wall.src = "images/parede5.png";
        //fase 5 (dois mapas interligados)
        //Dois mapas de 13x13 fase 4 (14 inimigos - 4 vacinas)
        this.map = [                          /*ligação mapas*/ 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 6, 0, 0, 0, 0, 1, 6, 0, 0, 0, 7, 1, 5, 5, 1, 0, 0, 0, 0, 0, 1, 6, 7, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 5, 5, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
          [1, 0, 0, 0, 0, 6, 1, 0, 0, 0, 0, 0, 1, 5, 5, 1, 6, 1, 5, 1, 0, 0, 6, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 5, 5, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
          [1, 6, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 0, 1],
          [1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 7, 0, 6, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1],
          [1, 0, 0, 1, 0, 6, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 4, 1, 0, 0, 1, 1, 0, 1],
          [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 5, 5, 1, 0, 6, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 5, 5, 1, 0, 1, 1, 1, 0, 1, 6, 0, 1, 0, 0, 1],
          [1, 1, 1, 1, 1, 0, 1, 0, 0, 6, 0, 0, 1, 5, 5, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
          [1, 0, 0, 6, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
      }
    }

    $("#fase").val(this.fase);
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];

        // ver a trajetoria e os quadrados do mapa
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileSize);
        } else if (tile == 7) {
          this.#drawPowerDot(ctx, column, row, this.tileSize);
        } else {
          this.#drawBlank(ctx, column, row, this.tileSize);
        }

        // Marcação para facilitar a visualização dos blocos
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // );
      }
    }
  }

  #drawDot(ctx, column, row, size) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnimationTimer--;
    if (this.powerDotAnimationTimer === 0) {
      this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
      if (this.powerDot == this.pinkDot) {
        this.powerDot = this.yellowDot;
      } else {
        this.powerDot = this.pinkDot;
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  getJuca(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = 0;
          return new Juca(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile == 6) {
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      //metodo que concerta o bug da animação do personagem
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      // verifica aonde está o pacman
      const tile = this.map[row][column];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

  didWin() {
    return this.#dotsLeft() === 0; //quantos alcool ainda restam
  }

  #dotsLeft() {
    return this.map.flat().filter((tile) => tile === 0).length; //metodo flat transforma um array dentro da outra em uma unica array
  }

  eatDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 0) {
        this.map[row][column] = 5;
        return true;
      }
    }
    return false;
  }

  eatPowerDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 7) {
        this.map[row][column] = 5;
        return true;
      }
    }
    return false;
  }
  /*query selector == seletor da URL... veio daqui: https://stackoverflow.com/questions/979975/get-the-values-from-the-get-parameters-javascript
  O QUE FAZ MUDAR A FASE*/
  parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair.shift());
      var value = decodeURIComponent(pair.join("="));
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = value;
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], value];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(value);
      }
    }
    return query_string;
  }
}