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
  this.context.fillText(this.player1Score + "-" + this.player2Score, this.canvas.width / 2, 100)
};

Scoreboard.prototype.displayWinner = function() {
  this.context.font="40px Verdana";
  this.context.textAlign="center";
  if (this.player1Score >= this.winningScore) {
    this.context.fillText('Game Over! Player 1 Wins!', this.canvas.width / 2, 200);
  } else if (this.player2Score >= this.winningScore) {
    this.context.fillText('Game Over! Player 2 Wins!', this.canvas.width / 2, 200);
  }
  this.context.fillText('Final Score: ' + this.player1Score + '-' + this.player2Score, this.canvas.width / 2, 300);
  this.context.fillText('Press enter to start a new game.', this.canvas.width / 2, 400);
}

module.exports = Scoreboard;
