var Slime = require('./slime');
var Net = require('./net')

function Game(){
  var canvas = document.createElement('canvas');
  var width = 1100;
  var height = 600;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');

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
    net.render();
    context.beginPath();
    player1.render();
    context.closePath();
    context.beginPath();
    player2.render();
    context.closePath();
    requestAnimationFrame(gameLoop);
  });
}
module.exports = Game;
