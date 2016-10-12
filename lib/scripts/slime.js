function Slime(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 600;
  this.radius = 80;
  this.speed = attributes.speed || 3;
  this.color = attributes.color || 'red';
  this.context = attributes.context;
  this.keysDown = attributes.keysDown;
};

Slime.prototype.render = function() {
  this.context.arc(this.x, this.y, this.radius, Math.PI, false);
  this.context.fillStyle = this.color;
  this.context.fill();
};

Slime.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
};
// w == 87
// a == 65
// d == 68

Slime.prototype.updatePosition = function(moveLeft, moveRight) {
  for (var key in this.keysDown) {
    var value = Number(key);
    if (value == moveRight) {
      this.move(5, 0);
    } else if (value == moveLeft) {
      this.move(-5, 0);
    } else {
      this.move(0, 0);
    }
  }
  return this;
};

module.exports = Slime;
