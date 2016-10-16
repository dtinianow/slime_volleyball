function Slime(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 600;
  this.radius = 80;
  this.speed = attributes.speed || 3;
  this.color = attributes.color || 'red';
  this.context = attributes.context;
  this.keysDown = attributes.keysDown;
  this.canvas = attributes.canvas;
};

Slime.prototype.render = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, Math.PI, false);
  this.context.fillStyle = this.color;
  this.context.fill();
};

Slime.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
};

Slime.prototype.updatePosition = function(moveLeft, moveRight) {
  for (var key in this.keysDown) {
    var value = Number(key);
    if (value == moveRight && this.x < this.canvas.width - this.radius && this.x != (this.canvas.width / 2 - this.radius - 5)) {
      this.move(10, 0);
    } else if (value == moveLeft && this.x > (0 + this.radius) && this.x != (this.canvas.width / 2 + this.radius + 5)) {
      this.move(-10, 0);
    } else {
      this.move(0, 0);
    }
  }
  return this;
};

module.exports = Slime;
