function Ball(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 300;
  this.radius = attributes.radius || 20;
  this.speed = attributes.speed || 3;
  this.color = 'white';
  this.context = attributes.context;
  this.canvas = attributes.canvas;
}

Ball.prototype.move = function(x, y){
  this.x += x;
  this.y += y;
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false)
  this.context.fillStyle = this.color;
  this.context.fill();
}

module.exports = Ball;
