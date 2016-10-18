var Slime = require('./slime')

function Player(attributes) {
  this.slime = attributes.slime || new Slime(attributes)
}

Player.prototype.render = function() {
  this.slime.keysDown = keysDown;
  this.slime.updatePosition(65, 68, 87).render();
}

module.exports = Player;
