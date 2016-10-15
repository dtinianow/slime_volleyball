var Slime = require('./slime');
var Net = require('./net')
var Ball = require('./ball')
var Scoreboard = require('./scoreboard')

function Game(){
  var canvas = document.createElement('canvas');
  var width = 1100;
  var height = 600;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');
  this.player1 = new Player1();
  this.player2 = new Player2();
  this.net = new Net(context);
  this.scoreboard = new Scoreboard({canvas: canvas, context: context});
  this.ball = new Ball({context: context, canvas: canvas});
  this.active

  window.onload = function() {
    document.body.appendChild(canvas);
  };

  var keysDown = {};

  window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = 'active';
  });

  window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
  });

  function Player1() {
    this.slime = new Slime({context: context, canvas: canvas, keysDown: keysDown})
  }

  function Player2() {
    this.slime = new Slime({x: 775, color: 'green', context: context, canvas: canvas, keysDown: keysDown})
  }

  Player1.prototype.render = function() {
    this.slime.keysDown = keysDown;
    this.slime.updatePosition(65, 68).render();
  }

  Player2.prototype.render = function() {
    this.slime.keysDown = keysDown;
    this.slime.updatePosition(37, 39).render();
  }

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (this.scoreboard.player1Score >= this.scoreboard.winningScore || this.scoreboard.player2score >= this.scoreboard.winningScore){
      this.scoreboard.displayWinner();
    }else {
      this.scoreboard.render();
      this.net.render();
      this.player1.render();
      this.player2.render();
      this.ballCollision(canvas);
      this.ball.render();
      requestAnimationFrame(gameLoop.bind(this));
  }
  }.bind(this));
}

Game.prototype.ballCollision = function(canvas){
  var dx1 = this.ball.x - this.player1.slime.x
  var dy1 = this.ball.y - this.player1.slime.y
  var distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var dx2 = this.ball.x - this.player2.slime.x
  var dy2 = this.ball.y - this.player2.slime.y
  var distance1 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  var slime_radius = this.player1.slime.radius

  if (distance < this.ball.radius + slime_radius){
    this.ball.y_speed = -this.ball.y_speed;
    this.ball.x_speed = (this.ball.x - this.player1.slime.x)/4
  } else if (distance1 < this.ball.radius + slime_radius) {
    this.ball.y_speed = -this.ball.y_speed;
    this.ball.x_speed = (this.ball.x - this.player2.slime.x)/4
  } else if (this.ball.x < 0 || this.ball.x > canvas.width) {
    this.ball.x_speed = -this.ball.x_speed
    //this.ball touches ground (turn into left side)
  } else if (this.ball.y > canvas.height + this.ball.radius) {
    this.scoreGame(canvas);
    // this.ball touches right side
    // } else if (this.ball.y > canvas.height + this.ball.radius) {
    //   this.ball.y_speed = 0
    //   this.ball.x_speed = 0;
  } else if ((this.ball.x > 530 && this.ball.x < 560) && this.ball.y > this.net.y + this.net.height - 20) {
    this.ball.y_speed = -this.ball.y_speed
    this.ball.x_speed = -this.ball.x_speed
  }
  else{
    this.ball.y_speed++;
  }
  this.ball.y += this.ball.y_speed;
  this.ball.x += this.ball.x_speed;
}

Game.prototype.scoreGame = function(canvas) {
  if (this.ball.x < canvas.width / 2) {
    this.scoreboard.player2Score++;
    // this.scoreboard.displayGameStatus();
    this.ball.x = 775;
    this.ball.y = 300;
    this.ball.x_speed = 0;
    this.ball.y_speed = 5;
  } else if (this.ball.x > canvas.width / 2){
    this.scoreboard.player1Score++;
    // this.scoreboard.displayGameStatus();
    this.ball.x = 275;
    this.ball.y = 300;
    this.ball.x_speed = 0;
    this.ball.y_speed = 5;
  }
  this.player1.slime.x = 275;
  this.player1.slime.y = 600;
  this.player2.slime.x = 775;
  this.player2.slime.y = 600;
}


module.exports = Game;
