function Slime(attributes = {}) {
  this.x = attributes.x;
  this.y = attributes.y;
  this.radius = 80;
  this.speed = attributes.speed;
  this.color = attributes.color;
  this.context = attributes.context;
}

Slime.prototype.render = function() {
  this.context.arc(this.x, this.y, this.radius, Math.PI, false);
  this.context.fillStyle = this.color;
  this.context.fill();
}

module.exports = Slime;
