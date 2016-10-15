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
  this.displayGameStatus();
  // this.checkScore;
};

Scoreboard.prototype.displayGameStatus = function() {
  this.context.font="70px Verdana";
  this.context.textAlign="center";
  if (this.player1Score === 1) {
    this.context.fillText('Game Over! Player 1 Wins!', this.canvas.width/2, 300);
    // this.resetGame();
  } else if (this.player2Score === 1) {
    this.context.fillText('Game Over! Player 2 Wins!', this.canvas.width/2, 300);
    // this.resetGame();
  }
}

module.exports = Scoreboard;
