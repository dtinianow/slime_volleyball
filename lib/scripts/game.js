var Slime = require('./slime');
var Net = require('./net');
var Ball = require('./ball');
var Scoreboard = require('./scoreboard');
var Menu = require('./menu');
var Player = require('./player');

function Game() {
  var canvas = document.createElement('canvas');
  canvas.setAttribute("id", "canvasID");
  canvas.width = 1100;
  canvas.height = 600;
  var context = canvas.getContext('2d');
  var keysDown = {};
  this.ball = new Ball({context: context, canvas: canvas});
  var player1Attributes = {context: context, canvas: canvas, keysDown: keysDown, ball: this.ball, player: "player 1"}
  var player2Attributes = {x: 775, color: 'green', context: context, canvas: canvas, keysDown: keysDown, ball: this.ball, player: "player 2"}
  var player1KeyCodes = {moveLeft: 65, moveRight: 68, jump: 87};
  var player2KeyCodes = {moveLeft: 37, moveRight: 39, jump: 38};
  this.player1 = new Player(player1Attributes, player1KeyCodes);
  this.player2 = new Player(player2Attributes, player2KeyCodes);
  this.net = new Net(context);
  this.scoreboard = new Scoreboard({canvas: canvas, context: context});
  this.showGameOverMenu = false;
  this.showMainMenu = true;
  this.menu = new Menu({context: context, canvas: canvas});
  this.difficulty = "normal";
  this.isNewPoint = false;

  window.onload = function() {
    document.body.appendChild(canvas);
  };

  window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = 'active';
  });

  window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
  });

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (this.showGameOverMenu) {
      this.saveScore();
      this.scoreboard.displayWinner();
      this.gameOverMenu(keysDown);
    } else if (this.showMainMenu) {
      this.menu.render();
      this.mainMenu(keysDown);
    } else {
      this.renderGame(canvas, keysDown);
    }
    requestAnimationFrame(gameLoop.bind(this));
  }.bind(this));
};

Game.prototype.renderGame = function(canvas, keysDown) {
  this.scoreboard.render();
  this.net.render();
  this.player1.render(keysDown);
  this.player2.render(keysDown);
  this.move(canvas);
  this.ball.render();
};

Game.prototype.checkScore = function() {
  this.ifPlayer1Wins();
  this.ifPlayer2Wins();
};

Game.prototype.ifPlayer1Wins = function() {
  if (this.scoreboard.player1Score >= this.scoreboard.winningScore) {
    this.scoreboard.player1GamesWon++;
    this.showGameOverMenu = true;
  };
}

Game.prototype.ifPlayer2Wins = function() {
  if (this.scoreboard.player2Score >= this.scoreboard.winningScore) {
    this.scoreboard.player2GamesWon++;
    this.showGameOverMenu = true;
  };
}

Game.prototype.saveScore = function() {
  localStorage.setItem('player1Score', this.scoreboard.player1GamesWon)
  localStorage.setItem('player2Score', this.scoreboard.player2GamesWon)
}

Game.prototype.gameOverMenu = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value === 13) { this.startNewMatch() };
    if (value === 77) { this.scoreboard.resetMatchScore() };
    if (value === 27) { this.returnToMainMenu() };
  };
};

Game.prototype.mainMenu = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 78) { this.startNormalMode(); } ;
    if (value == 73) { this.startInsaneMode(); };
  };
};

Game.prototype.scoreGame = function(canvas) {
  this.checkIfPointScored(canvas);
  this.ball.resetAfterPoint(this.difficulty);
  this.player1.slime.resetPosition();
  this.player2.slime.resetPosition();
  this.checkScore();
  this.insanePlayer1GamePoint();
  this.insanePlayer2GamePoint();
};

Game.prototype.checkIfPointScored = function(canvas) {
  if (this.ball.x > canvas.width / 2){
    this.scoreboard.player1Score++;
    this.ball.x = 275;
  } else if (this.ball.x < canvas.width / 2) {
    this.scoreboard.player2Score++;
    this.ball.x = 775;
  };
};

Game.prototype.move = function(canvas){

  [this.player1, this.player2].forEach(function(player){
    this.collideWithPlayer(player);
  }.bind(this));

  this.delayServe();
  this.collideWithWall(canvas);
  this.collideWithGround(canvas);
  this.collideWithNet();
  this.collideWithCeiling();
  this.ballGravity();
  this.slimeGravity(this.player1);
  this.slimeGravity(this.player2);
  this.ballMovement();
};

Game.prototype.calculateDistance = function(player) {
  var dx = this.ball.x - player.slime.x;
  var dy = this.ball.y - player.slime.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Game.prototype.collideWithPlayer = function(player) {
  var distance = this.calculateDistance(player)
  if (this.ball.isTouchingSlime(distance)){
    this.ball.bounce(player);
    this.insaneSlimeCollision(player);
  };
};

Game.prototype.delayServe = function() {
  if (this.isNewPoint) {
    this.ball.y_speed = 0;
  };
};

Game.prototype.collideWithWall = function(canvas) {
  if (this.ball.isTouchingWall(canvas)) {
    this.ball.x_speed *= -1.1;
    this.insaneBorderCollision();
  }
};

Game.prototype.collideWithGround = function(canvas) {
  if (this.ball.isTouchingGround(canvas)) {
    this.scoreGame(canvas);
    this.isNewPoint = true;
    setTimeout(function(){ this.isNewPoint = false }.bind(this), 1000);
  }
};

Game.prototype.collideWithNet = function() {
  if (this.ball.isTouchingNet(this.net)) {
    this.ball.y_speed *= -.9;
    this.ball.x_speed *= -1.1;
    this.insaneNetCollision(this.ball);
  };
};

Game.prototype.collideWithCeiling = function() {
  if (this.ball.isTouchingCeiling()) {
    this.ball.y_speed *= -1.1;
    this.insaneBorderCollision();
  };
};

Game.prototype.ballGravity = function(){
  this.ball.y_speed += .8;
};

Game.prototype.slimeGravity = function(player){
  if(player.slime.y < 600){ player.slime.y += 7.5 }
};

Game.prototype.ballMovement = function(){
  this.ball.y += this.ball.y_speed;
  this.ball.x += this.ball.x_speed;
};

Game.prototype.startNewMatch = function() {
  this.showGameOverMenu = false;
  this.scoreboard.resetScore();
  this.startNormalMode();

};

Game.prototype.startNormalMode = function() {
  this.difficulty = "normal"
  this.ball.radius = 20;
  this.player1.slime.radius = 80;
  this.player1.slime.color = "red";
  this.player2.slime.color = "green";
  this.player2.slime.radius = 80;
  this.ball.speed = 23
  document.getElementById('canvasID').style.backgroundColor = "pink";
  this.showMainMenu = false
}

Game.prototype.returnToMainMenu = function() {
  this.showMainMenu = true;
  this.showGameOverMenu = false;
  this.scoreboard.resetScore();
};

Game.prototype.insanePlayer1GamePoint = function() {
  if (this.scoreboard.player1Score === 6 && this.difficulty === "insane" && this.showGameOverMenu === false) {
    this.player1.slime.radius = 20
  }
}

Game.prototype.insanePlayer2GamePoint = function() {
  if (this.scoreboard.player2Score === 6 && this.difficulty === "insane" && this.showGameOverMenu === false) {
    this.player2.slime.radius = 20
  };
};

Game.prototype.startInsaneMode = function() {
  this.showMainMenu = false;
  this.ball.speed = 36;
  this.difficulty = "insane";
};

Game.prototype.insaneSlimeCollision = function(player) {
  var randomColor = '#'+Math.floor(Math.random()*1677215).toString(16);
  if (this.difficulty === 'insane') {
    player.slime.color = randomColor;
  };
};

Game.prototype.insaneBorderCollision = function() {
  var randomColor = '#'+Math.floor(Math.random()*1677215).toString(16);
  if (this.difficulty === 'insane') {
    document.getElementById('canvasID').style.backgroundColor = randomColor;
  };
};

Game.prototype.insaneNetCollision = function(ball) {
  if (this.difficulty === 'insane') { ball.radius = 80 }
};

module.exports = Game;
