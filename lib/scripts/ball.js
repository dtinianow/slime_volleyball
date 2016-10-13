function Ball(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 300;
  this.radius = attributes.radius || 20;
  this.x_speed = attributes.speed || 0;
  this.y_speed = attributes.speed || 5;
  this.color = 'white';
  this.context = attributes.context;
  this.canvas = attributes.canvas;
  this.player1 = attributes.player1;
  this.player2 = attributes.player2;
}

Ball.prototype.move = function(x, y){
  var dx1 = this.x - this.player1.slime.x
  var dy1 = this.y - this.player1.slime.y
  var distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var slime_radius = this.player1.slime.radius

  if (distance < this.radius + slime_radius){
    this.y_speed = -this.y_speed;
    this.x_speed = (this.x - this.player1.slime.x)/4
  } else if (this.x < 0 || this.x > this.canvas.width) {
    this.x_speed = -this.x_speed
  } else if (this.y > this.canvas.height) {
    this.y_speed = 0
    this.x_speed = 0
  }
  else{
    this.y_speed++;
  }
  this.y += this.y_speed;
  this.x += this.x_speed
}

Ball.prototype.render = function() {
  this.move();
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false)
  this.context.fillStyle = this.color;
  this.context.fill();
}

module.exports = Ball;
