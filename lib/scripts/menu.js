function Menu(attributes = {}) {
  this.context = attributes.context;
  this.canvas = attributes.canvas;
}

Menu.prototype.render = function() {
  this.context.textAlign="center";
  this.context.font="90px Verdana";
  this.context.fillText("Slime Volleyball", this.canvas.width / 2, 120);
  this.displayOptions();
};

Menu.prototype.displayOptions = function() {
  this.context.font="35px Verdana";
  this.context.fillText("First to 7 points wins!", this.canvas.width / 2, 180);
  this.context.fillText("Press `n` for normal mode", this.canvas.width / 2, 260);
  this.context.fillText("Press `i` for insane mode", this.canvas.width / 2, 340);
  this.context.fillText("Press `z` to play against AI", this.canvas.width / 2, 420);
  this.context.fillText("Press `x` to play insane AI", this.canvas.width / 2, 500);
  this.context.fillText("Press `q` for instructions", this.canvas.width / 2, 580);
};

Menu.prototype.getInstructions = function() {
  this.context.textAlign="center";
  this.context.font="90px Verdana";
  this.context.fillText("How To Play", this.canvas.width / 2, 150);
  this.player1Instructions();
  this.player2Instructions();
  this.changeBackgroundInstructions();
  this.returnToMainMenuInstructions();
};

Menu.prototype.player1Instructions = function() {
  this.context.textAlign="center";
  this.context.font="40px Verdana";
  this.context.fillText("Player 1 / Single Player", this.canvas.width - 800, 260);
  this.context.textAlign="left";
  this.context.font="30px Verdana";
  this.context.fillText("a: move left", this.canvas.width - 900, 340);
  this.context.fillText("d: move right", this.canvas.width - 900, 390);
  this.context.fillText("w: jump", this.canvas.width - 900, 440);
};

Menu.prototype.player2Instructions = function() {
  this.context.textAlign="center";
  this.context.font="40px Verdana";
  this.context.fillText("Player 2", this.canvas.width - 350, 260);
  this.context.textAlign="left";
  this.context.font="30px Verdana";
  this.context.fillText("left arrow key: move left", this.canvas.width - 500, 340);
  this.context.fillText("right arrow key: move right", this.canvas.width - 500, 390);
  this.context.fillText("up arrow key: jump", this.canvas.width - 500, 440);
};

Menu.prototype.changeBackgroundInstructions = function() {
  this.context.textAlign="center";
  this.context.font="20px Verdana";
  this.context.fillText("To change the background during normal mode, press any key 1-9", this.canvas.width /2, 500);
};

Menu.prototype.returnToMainMenuInstructions = function() {
  this.context.font="30px Verdana";
  this.context.fillText("Press `enter` to return to main menu", this.canvas.width /2, 560);
};

module.exports = Menu;
