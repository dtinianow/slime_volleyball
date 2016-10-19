const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/scripts/player')
const stub = require('./support/stub')
const Slime = require('../lib/scripts/slime')

describe('Player', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      // let attributes = stub();
      // let keyCodes = stub();
      // let moveLeft = stub();
      // let moveRight = stub();
      // let jump = stub();
      // let player = new Player({attributes: attributes, keyCodes: keyCodes});
      // assert.equal(player.moveLeft, keyCodes.moveLeft);
    })
  })
  context('with default functions', function() {
    it('should be instantiated', function() {
      let attributes = stub();
      let keyCodes = stub();
      // let player = new Player({attributes: attributes, keyCodes: keyCodes});
      // assert.isFunciton(player.render);
    })
  })
})
