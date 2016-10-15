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
  var game = this;

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

  var player1 = new Player1();
  var player2 = new Player2();
  var net = new Net(context);
  var scoreboard = new Scoreboard({canvas: canvas, context: context});
  var ball = new Ball({context: context, canvas: canvas, player1: player1, player2: player2, net: net});

  function Player1() {
    this.slime = new Slime({context: context, canvas: canvas, keysDown: keysDown})
  }

  function Player2() {
    this.slime = new Slime({x: 775, color: 'green', context: context, canvas: canvas, keysDown: keysDown})
  }

  Player1.prototype.render = function() {
    this.slime.updatePosition(65, 68).render();
  }

  Player2.prototype.render = function() {
    this.slime.updatePosition(37, 39).render();
  }

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    scoreboard.render();
    net.render();
    player1.render();
    player2.render();
    ball.render();
    game.ballCollision(ball, player1, player2, net, canvas);
    requestAnimationFrame(gameLoop);
  });
}

Game.prototype.ballCollision = function(ball, player1, player2, net, canvas){
  var dx1 = ball.x - player1.slime.x
  var dy1 = ball.y - player1.slime.y
  var distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var dx2 = ball.x - player2.slime.x
  var dy2 = ball.y - player2.slime.y
  var distance1 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  var slime_radius = player1.slime.radius

  if (distance < ball.radius + slime_radius){
    ball.y_speed = -ball.y_speed;
    ball.x_speed = (ball.x - player1.slime.x)/4
  } else if (distance1 < ball.radius + slime_radius) {
    ball.y_speed = -ball.y_speed;
    ball.x_speed = (ball.x - player2.slime.x)/4
  } else if (ball.x < 0 || ball.x > canvas.width) {
    ball.x_speed = -ball.x_speed
  } else if (ball.y > canvas.height + ball.radius) {
    ball.y_speed = 0
    ball.x_speed = 0
  } else if ((ball.x > 530 && ball.x < 560) && ball.y > net.y + net.height - 20) {
    ball.y_speed = -ball.y_speed
    ball.x_speed = -ball.x_speed
  }
  else{
    ball.y_speed++;
  }
  ball.y += ball.y_speed;
  ball.x += ball.x_speed;
}

module.exports = Game;
