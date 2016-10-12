var Slime = require('./slime');

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

  function Player1() {
    this.slime = new Slime({context: context, keysDown: keysDown})
  }

  function Player2() {
    this.slime = new Slime({x: 775, color: 'green', context: context, keysDown: keysDown})
  }

  Player1.prototype.render = function() {
    this.slime.updatePosition(37, 39).render();
  }

  Player2.prototype.render = function() {
    this.slime.updatePosition(65, 68).render();
  }
    // var slime = new Slime({context: context, keysDown: keysDown})
  var player1 = new Player1();
  var player2 = new Player2();

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
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
