function Ball(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 300;
  this.radius = attributes.radius || 20;
  this.x_speed = attributes.x_speed || 0;
  this.y_speed = attributes.y_speed || 5;
  this.color = 'white';
  this.context = attributes.context;
  this.speed = attributes.speed || 23;
  this.slimeRadius = 80;
}

Ball.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false)
  this.context.fillStyle = this.color;
  this.context.fill();
}

Ball.prototype.isTouchingSlime = function(distance){
  return distance <= this.radius + this.slimeRadius;
}

Ball.prototype.bounce = function(player) {
  var angleRadians = Math.atan2(this.y - player.slime.y, this.x - player.slime.x)
  this.y_speed = Math.sin(angleRadians) * this.speed;
  this.x_speed = Math.cos(angleRadians) * this.speed;
}

Ball.prototype.isTouchingWall = function(canvas) {
  return this.x <= 0 || this.x >= canvas.width;
}

Ball.prototype.isTouchingGround = function(canvas){
  return this.y > canvas.height + this.radius;
}

Ball.prototype.isTouchingNet = function(net) {
  return (this.x + this.radius >= 535 && this.x - this.radius <= 565) && this.y + this.radius >= net.y + net.height
}

Ball.prototype.isTouchingCeiling = function(){
  return (this.y + this.radius) <= 0
}
module.exports = Ball;
