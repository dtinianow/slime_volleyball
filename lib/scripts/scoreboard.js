function Scoreboard(attributes = {}) {
  this.player1Score = 0;
  this.player2Score = 0;
  this.winningScore = 7;
  this.context = attributes.context;
  this.canvas = attributes.canvas;
};

Scoreboard.prototype.render = function() {
  this.context.font="100px Verdana";
  this.context.textAlign="center";
  this.context.fillText(this.player1Score + "-" + this.player2Score, this.canvas.width/2, 100)
  // this.checkScore;
};

module.exports = Scoreboard;
