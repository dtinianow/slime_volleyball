var Slime = require('./slime');

function Player(attributes, keyCodes) {
  this.moveLeft = keyCodes.moveLeft;
  this.moveRight = keyCodes.moveRight;
  this.jump = keyCodes.jump;
  this.slime = new Slime(attributes);
}

Player.prototype.render = function(keysDown) {
  this.slime.keysDown = keysDown;
  this.slime.updatePosition(this.moveLeft, this.moveRight, this.jump).render();
};

module.exports = Player;
