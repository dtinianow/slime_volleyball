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
  if (this.player1Score === 7 || this.player2Score === 7) {
    this.displayWinner();
  }
};
// Scoreboard.prototype.player1Wins = funciton() {
//   this.active = false
//   this.player1wins = true
//   this.context.font="70px Verdana";
//   this.context.textAlign="center";
//   this.context.fillText('Game Over! Player 1 Wins!', this.canvas.width/2, 300);
//   // this.resetGame();
// }

Scoreboard.prototype.displayWinner = function() {
  this.context.font="70px Verdana";
  this.context.textAlign="center";
  if (this.player1Score >= this.winningScore) {
    this.context.fillText('Game Over! Player 1 Wins!', this.canvas.width/2, 300);
    this.context.fillText('Press enter to start a new game.', this.canvas.width/2, 400);
  }
  else if (this.player2Score >= this.winningScore) {
    this.context.fillText('Game Over! Player 2 Wins!', this.canvas.width/2, 300);
    this.context.fillText('Press enter to start a new game.', this.canvas.width/2, 400);
  }
  // this.resetGame();
}

Scoreboard.prototype.displayGameStatus = function() {
}

module.exports = Scoreboard;
