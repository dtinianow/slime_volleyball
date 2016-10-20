const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/scripts/player')
const stub = require('./support/stub')
const Slime = require('../lib/scripts/slime')
const Ball = require('../lib/scripts/ball')

describe('Player', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let ball = new Ball();
      let canvas = stub();
      let keysDown = stub();
      let attributes = {context: context, canvas: canvas, keysDown: keysDown, ball: ball, player: "player 1"}
      let keyCodes = {moveLeft: 65, moveRight: 68, jump: 87};
      let moveLeft = stub();
      let moveRight = stub();
      let jump = stub();
      let player = new Player(attributes, keyCodes);
      assert.equal(player.moveLeft, keyCodes.moveLeft);
      assert.equal(player.moveRight, keyCodes.moveRight);
      assert.equal(player.jump, keyCodes.jump);
    })
  })
  context('with default functions', function() {
    it('should be instantiated', function() {
      let ball = new Ball();
      let canvas = stub();
      let keysDown = stub();
      let attributes = {context: context, canvas: canvas, keysDown: keysDown, ball: ball, player: "player 1"}
      let keyCodes = {moveLeft: 65, moveRight: 68, jump: 87};
      let moveLeft = stub();
      let moveRight = stub();
      let jump = stub();
      let player = new Player(attributes, keyCodes);
      assert.isFunction(player.render);
    })
  })
})
