var Slime = require('./slime');

function Game(){
  var canvas = document.createElement('canvas');
  var width = 1100;
  var height = 600;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');

  var slime = new Slime({context: context})

  window.onload = function() {
    document.body.appendChild(canvas);
  };

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    slime.updatePosition().render();
    requestAnimationFrame(gameLoop);
  });
}
module.exports = Game;
