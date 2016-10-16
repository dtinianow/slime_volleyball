function Ball(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 300;
  this.radius = attributes.radius || 20;
  this.x_speed = attributes.x_speed || 0;
  this.y_speed = attributes.y_speed || 5;
  this.color = 'white';
  this.context = attributes.context;
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false)
  this.context.fillStyle = this.color;
  this.context.fill();
}

module.exports = Ball;
