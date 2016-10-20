const chai = require('chai');
const assert = chai.assert;
const Ball = require('../lib/scripts/ball')
const stub = require('./support/stub')
const Slime = require('../lib/scripts/slime')
const Net = require('../lib/scripts/net')
const Player = require('../lib/scripts/player')
const Scoreboard = require('../lib/scripts/scoreboard')
const Menu = require('../lib/scripts/menu')
const Game = require('../lib/scripts/game')

describe('Game', function() {
  context('With default attributes', function () {
    it('should be instantiated', function() {
      let slime = new Slime;
      let ball = new Ball;
      let net = new Net;
      let scoreboard = new Scoreboard;
      let context = stub();
      let menu = new Menu;
      let game = new Game;
      assert.equal(game.showGameOverMenu, false)
      assert.equal(game.showMainMenu, true)
      assert.equal(game.difficulty, "normal")
      assert.equal(game.isNewPoint, false)
    });
  })
  context('With default functions', function () {
    it('should be instantiated', function() {
      let slime = new Slime;
      let ball = new Ball;
      let net = new Net;
      let scoreboard = new Scoreboard;
      let context = stub();
      let menu = new Menu;
      let game = new Game;
      assert.isFunction(game.renderGame)
      assert.isFunction(game.saveScore)
      assert.isFunction(game.gameOverMenu)
      assert.isFunction(game.renderBackground)
      assert.isFunction(game.changeBackgroundImage)
      assert.isFunction(game.mainMenu)
      assert.isFunction(game.scoreGame)
      assert.isFunction(game.checkIfPointScored)
      assert.isFunction(game.move)
      assert.isFunction(game.calculateDistance)
      assert.isFunction(game.collideWithPlayer)
      assert.isFunction(game.delayServe)
      assert.isFunction(game.collideWithWall)
      assert.isFunction(game.collideWithGround)
      assert.isFunction(game.collideWithNet)
      assert.isFunction(game.collideWithCeiling)
      assert.isFunction(game.startNewMatch)
      assert.isFunction(game.checkDifficulty)
      assert.isFunction(game.startNormalMode)
      assert.isFunction(game.returnToMainMenu)
      assert.isFunction(game.insanePlayer1GamePoint)
      assert.isFunction(game.insanePlayer2GamePoint)
      assert.isFunction(game.startInsaneMode)
      assert.isFunction(game.insaneSlimeCollision)
      assert.isFunction(game.insaneBorderCollision)
      assert.isFunction(game.insaneNetCollision)
    });
  })
})
