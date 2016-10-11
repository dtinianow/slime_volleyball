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
  
  requestAnimationFrame(function gameLoop() {
    requestAnimationFrame(gameLoop);
  });
}

module.exports = Game;
