const chai = require('chai');
const assert = chai.assert;
const Slime = require('../lib/scripts/slime')

describe('Slime', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let slime = new Slime;
      assert.isObject(slime);
    })
    it('should a default radius', function() {
      let attributes = {x: 0, y: 1, speed: 3, color: 'red'};
      let slime = new Slime(attributes);
      assert.equal(slime.radius, 80);
    })
    it('should have given attributes', function() {
      let attributes = {x: 0, y: 1, speed: 3, color: 'red'};
      let slime = new Slime(attributes);
      assert.equal(slime.x, 0);
      assert.equal(slime.y, 1);
      assert.equal(slime.speed, 3);
      assert.equal(slime.color, 'red');
    })
  })
})
