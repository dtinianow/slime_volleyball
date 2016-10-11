const chai = require('chai');
const assert = chai.assert;
const Slime = require('../lib/scripts/slime')

describe('Slime', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let slime = new Slime;
      assert.isObject(slime);
    })
    it('should have a default radius', function() {
      let slime = new Slime;
      assert.equal(slime.radius, 80);
    })
    it('should have a default x-coordinate', function() {
      let slime = new Slime;
      assert.equal(slime.x, 275);
    })
    it('should have a default y-coordinate', function() {
      let slime = new Slime;
      assert.equal(slime.y, 600);
    })
    it('should have a default color', function() {
      let slime = new Slime;
      assert.equal(slime.color, 'red');
    })
    it('should have a default speed', function() {
      let slime = new Slime;
      assert.equal(slime.speed, 3);
    })
    it('should have given attributes', function() {
      let attributes = {x: 1, y: 1, speed: 4, color: 'blue'};
      let slime = new Slime(attributes);
      assert.equal(slime.x, 1);
      assert.equal(slime.y, 1);
      assert.equal(slime.speed, 4);
      assert.equal(slime.color, 'blue');
    })
    it('should be able to move', function(){
      let slime = new Slime;
      assert.isFunction(slime.move);
    })
  })
})

describe('Move', function() {
  context('Movement', function() {
    it('should change x-coordinates', function() {
      let attributes = {x: 0, y: 1, speed: 3, color: 'red'};
      let slime = new Slime(attributes);
      assert.isFunction(slime.move);
    })
  })
})
