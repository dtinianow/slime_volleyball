const chai = require('chai');
const assert = chai.assert;
const Scoreboard = require('../lib/scripts/scoreboard');
const stub = require('./support/stub');

describe('Scoreboard', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let context = stub();
      let canvas = stub();
      let scoreboard = new Scoreboard({context: context, canvas: canvas, player1GamesWon: 0, player2GamesWon: 0});
      assert.equal(scoreboard.player1Score, 0);
      assert.equal(scoreboard.player2Score, 0);
      assert.equal(scoreboard.player1GamesWon, 0);
      assert.equal(scoreboard.player2GamesWon, 0);
      assert.equal(scoreboard.winningScore, 7);
      assert.equal(scoreboard.context, context);
      assert.equal(scoreboard.canvas, canvas);
    });
  });
  context('with default functions', function() {
    it('should be instantiated', function() {
      let context = stub();
      let canvas = stub();
      let scoreboard = new Scoreboard({context: context, canvas: canvas, player1GamesWon: 0, player2GamesWon: 0});
      assert.isFunction(scoreboard.render);
      assert.isFunction(scoreboard.displayWinner);
      assert.isFunction(scoreboard.displayTotalWins);
      assert.isFunction(scoreboard.resetScore);
      assert.isFunction(scoreboard.resetMatchScore);
      assert.isFunction(scoreboard.gameOver);
      assert.isFunction(scoreboard.doesPlayer1Win);
      assert.isFunction(scoreboard.doesPlayer2Win);
    });
    it('should be reset score', function() {
      let context = stub();
      let canvas = stub();
      let scoreboard = new Scoreboard({context: context, canvas: canvas});
      scoreboard.player1Score = 1;
      scoreboard.player2Score = 1;
      assert.equal(scoreboard.player1Score, 1);
      assert.equal(scoreboard.player2Score, 1);
      scoreboard.resetScore();
      assert.equal(scoreboard.player1Score, 0);
      assert.equal(scoreboard.player2Score, 0);
    });
    it('should count match score', function() {
      let context = stub();
      let canvas = stub();
      let scoreboard = new Scoreboard({context: context, canvas: canvas});
      scoreboard.player1Score = 1;
      scoreboard.player2Score = 1;
      scoreboard.player1GamesWon = 1;
      scoreboard.player2GamesWon = 1;
      assert.equal(scoreboard.player1GamesWon, 1);
      assert.equal(scoreboard.player2GamesWon, 1);
      scoreboard.resetMatchScore();
      assert.equal(scoreboard.player1GamesWon, 0);
      assert.equal(scoreboard.player2GamesWon, 0);
    });
    it('should add match wins when score reaches 7', function() {
      let context = stub();
      let canvas = stub();
      let scoreboard = new Scoreboard({context: context, canvas: canvas});
      scoreboard.player1GamesWon = 1;
      scoreboard.player2GamesWon = 1;
      scoreboard.player1Score = 7;
      assert.equal(scoreboard.player1GamesWon, 1);
      assert.equal(scoreboard.player2GamesWon, 1);
      scoreboard.doesPlayer1Win();
      assert.equal(scoreboard.player1GamesWon, 2);
      assert.equal(scoreboard.player2GamesWon, 1);
      scoreboard.player2Score = 7;
      scoreboard.doesPlayer2Win();
      assert.equal(scoreboard.player2GamesWon, 2);
    });
  });
});
