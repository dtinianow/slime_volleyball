function Menu(attributes = {}) {
  this.context = attributes.context;
  this.canvas = attributes.canvas;
}

Menu.prototype.render = function() {
  this.context.textAlign="center";
  this.context.font="90px Verdana";
  this.context.fillText("Slime Volleyball", this.canvas.width / 2, 150)
  this.context.font="60px Verdana";
  this.context.fillText("Press `n` for normal mode", this.canvas.width / 2, 300)
  this.context.fillText("Press `i` for insane mode", this.canvas.width / 2, 400)
}

module.exports = Menu;
