function Scoreboard(attributes = {}) {
  this.player1Score = 0;
  this.player2Score = 0;
  this.player1GamesWon = localStorage.getItem('player1Score') || 0;
  this.player2GamesWon = localStorage.getItem('player2Score') || 0;
  this.winningScore = 7;
  this.context = attributes.context;
  this.canvas = attributes.canvas;
}

Scoreboard.prototype.render = function() {
  this.context.font="100px Verdana";
  this.context.textAlign="center";
  this.context.fillText(this.player1Score + "-" + this.player2Score, this.canvas.width / 2, 100);
};

Scoreboard.prototype.displayWinner = function() {
  this.context.font="40px Verdana";
  this.context.textAlign="center";
  if (this.player1Score >= this.winningScore) {
    this.context.fillText('Game Over! Player 1 Wins!', this.canvas.width / 2, 150);
  } else if (this.player2Score >= this.winningScore) {
    this.context.fillText('Game Over! Player 2 Wins!', this.canvas.width / 2, 150);
  }
  this.displayTotalWins();
  this.context.font="30px Verdana";
  this.context.fillText('Press `enter` to start a new game', this.canvas.width / 2, 450);
  this.context.fillText('Press `m` to reset the match score', this.canvas.width / 2, 500);
  this.context.fillText('Press `esc` to return to the menu', this.canvas.width / 2, 550);
};

Scoreboard.prototype.displayTotalWins = function() {
  this.context.fillText('Player1   vs   Player2', this.canvas.width / 2, 250);
  this.context.fillText(this.player1GamesWon + '    -    ' + this.player2GamesWon, this.canvas.width / 2, 350);
};

Scoreboard.prototype.resetScore = function() {
  this.player1Score = 0;
  this.player2Score = 0;
};

Scoreboard.prototype.resetMatchScore = function() {
  localStorage.setItem('player1Score', 0);
  localStorage.setItem('player2Score', 0);
  this.player1GamesWon = 0;
  this.player2GamesWon = 0;
};

Scoreboard.prototype.gameOver = function() {
  return (this.doesPlayer1Win() || this.doesPlayer2Win());
};

Scoreboard.prototype.doesPlayer1Win = function() {
  if (this.player1Score >= this.winningScore) {
    this.player1GamesWon++;
    return true;
  }
};

Scoreboard.prototype.doesPlayer2Win = function() {
  if (this.player2Score >= this.winningScore) {
    this.player2GamesWon++;
    return true;
  }
};

module.exports = Scoreboard;
