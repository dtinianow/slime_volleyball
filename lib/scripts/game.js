var Slime = require('./slime');

function Game(){
  var canvas = document.createElement('canvas');
  var width = 1100;
  var height = 600;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');

  var slime = new Slime({x: 100, y: canvas.height, speed: 3, color: 'red', context: context})

  window.onload = function() {
    document.body.appendChild(canvas);
  };

  requestAnimationFrame(function gameLoop() {
    slime.render();
    requestAnimationFrame(gameLoop);
  });
}
module.exports = Game;
