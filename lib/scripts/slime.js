function Slime(attributes = {}) {
  this.x = attributes.x || 275;
  this.y = attributes.y || 600;
  this.radius = 80;
  this.speed = attributes.speed || 3;
  this.color = attributes.color || 'red';
  this.context = attributes.context;
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

var keysDown = {};

Slime.prototype.updatePosition = function(keysDown = {}) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 39) {
      this.move(5, 0);
    } else if (value == 37) {
      this.move(-5, 0);
    } else {
      this.move(0, 0);
    }
  }
};

module.exports = Slime;
