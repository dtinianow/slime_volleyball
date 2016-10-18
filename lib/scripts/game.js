var Slime = require('./slime');
var Net = require('./net')
var Ball = require('./ball')
var Scoreboard = require('./scoreboard')
var Menu = require('./menu')

function Game() {
  var canvas = document.createElement('canvas');
  var width = 1100;
  var height = 600;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  this.ball = new Ball({context: context, canvas: canvas});
  this.player1 = new Player1(this.ball);
  this.player2 = new Player2(this.ball);
  this.net = new Net(context);
  this.scoreboard = new Scoreboard({canvas: canvas, context: context});
  this.gameOver = false;
  this.showMenu = true;
  this.menu = new Menu({context: context, canvas: canvas});
  this.difficulty = "normal";
  this.isNewPoint = false;
  var keysDown = {};

  window.onload = function() {
    document.body.appendChild(canvas);
  };

  window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = 'active';
  });

  window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
  });

  function Player1(ball) {
    this.slime = new Slime({context: context, canvas: canvas, keysDown: keysDown, ball: ball, player: "player 1"})
  }

  function Player2(ball) {
    this.slime = new Slime({x: 775, color: 'green', context: context, canvas: canvas, keysDown: keysDown, ball: ball, player: "player 2"})
  }

  Player1.prototype.render = function() {
    this.slime.keysDown = keysDown;
    this.slime.updatePosition(65, 68, 87).render();
  }

  Player2.prototype.render = function() {
    this.slime.keysDown = keysDown;
    this.slime.updatePosition(37, 39, 38).render();
  }

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (this.gameOver) {
      this.saveScore();
      this.scoreboard.displayWinner();
      this.playAgain(keysDown);
    } else if (this.showMenu) {
       this.menu.render();
       this.startNewGame(keysDown);
    } else {
      this.renderGame(canvas);
    }
    requestAnimationFrame(gameLoop.bind(this));
  }.bind(this));
}

Game.prototype.ballCollision = function(canvas){
  var dx1 = this.ball.x - this.player1.slime.x
  var dy1 = this.ball.y - this.player1.slime.y
  var distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var dx2 = this.ball.x - this.player2.slime.x
  var dy2 = this.ball.y - this.player2.slime.y
  var distance1 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  var randomColor = '#'+Math.floor(Math.random()*1677215).toString(16);

  if (this.ball.isTouchingSlime(distance)){
    this.ball.bounce(this.player1);
    this.player1.slime.color = randomColor
  } else if (this.isNewPoint) {
    this.ball.y_speed = 0;
  } else if (this.ball.isTouchingSlime(distance1)) {
    this.ball.bounce(this.player2);
    this.player2.slime.color = randomColor
  } else if (this.ball.isTouchingWall(canvas)) {
    this.ball.x_speed *= -1.1
  } else if (this.ball.isTouchingGround(canvas)) {
    this.scoreGame(canvas);
    this.isNewPoint = true;
    setTimeout(function(){ this.isNewPoint = false }.bind(this), 1000);
  } else if (this.ball.isTouchingNet(this.net)) {
    this.ball.y_speed *= -.9
    this.ball.x_speed *= -1.1
  } else if ((this.ball.y + this.ball.radius) <= 0) {
    this.ball.y_speed *= -1.1
  } else {
    this.ball.y_speed += .8;
  }
  if(this.player1.slime.y < 600 && this.player1.slime.jumping == false){ this.player1.slime.y += 7.5 }
  if(this.player2.slime.y < 600 && this.player1.slime.jumping == false){ this.player2.slime.y += 7.5 }
  this.ball.y += this.ball.y_speed;
  this.ball.x += this.ball.x_speed;
}


Game.prototype.scoreGame = function(canvas) {
  if (this.ball.x < canvas.width / 2) {
    this.scoreboard.player2Score++;
    this.ball.x = 775;
  } else if (this.ball.x > canvas.width / 2){
    this.scoreboard.player1Score++;
    this.ball.x = 275;
  }
  this.ball.y = 300;
  this.ball.x_speed = 0;
  if (this.difficulty == "insane") {
    this.ball.y_speed = 25;
  } else {
    this.ball.y_speed = 5;
  }
  this.player1.slime.x = 275;
  this.player1.slime.y = 600;
  this.player2.slime.x = 775;
  this.player2.slime.y = 600;
  this.checkScore();
}

Game.prototype.checkScore = function() {
  if (this.scoreboard.player1Score >= this.scoreboard.winningScore) {
    this.scoreboard.player1GamesWon++;
    this.gameOver = true;
  } else if (this.scoreboard.player2Score >= this.scoreboard.winningScore) {
    this.scoreboard.player2GamesWon++;
    this.gameOver = true;
  }
}

Game.prototype.saveScore = function() {
  localStorage.setItem('player1Score', this.scoreboard.player1GamesWon)
  localStorage.setItem('player2Score', this.scoreboard.player2GamesWon)
}

Game.prototype.renderGame = function(canvas) {
  this.scoreboard.render();
  this.net.render();
  this.player1.render();
  this.player2.render();
  this.ballCollision(canvas);
  this.ball.render();
}

Game.prototype.playAgain = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 13) {
      this.gameOver = false;
      this.scoreboard.resetScore();
    } else if (value == 77) {
      this.scoreboard.resetMatchScore();
    } else if (value == 27) {
      this.showMenu = true;
      this.gameOver = false;
      this.scoreboard.resetScore();
    }
  }
}

Game.prototype.startNewGame = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 78) {
      this.showMenu = false;
    } else if (value == 73) {
      this.showMenu = false;
      this.startInsaneMode();
    }
  }
}

Game.prototype.startInsaneMode = function() {
  this.ball.speed = 36;
  this.difficulty = "insane"
}

module.exports = Game;
