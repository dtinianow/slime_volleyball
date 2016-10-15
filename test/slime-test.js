const chai = require('chai');
const assert = chai.assert;
const Slime = require('../lib/scripts/slime')
const stub = require('./support/stub')

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
    it('should be able to update position', function() {
      let slime = new Slime;
      assert.isFunction(slime.updatePosition);
    });
  });
});

describe('Move', function() {
  context('when the slimes moves', function() {
    it('should change x-coordinates', function() {
      let slime = new Slime;
      assert.equal(slime.x, 275);
      slime.move(5, 0);
      assert.equal(slime.x, 280);
    });
  });
});

describe('Update Position', function() {
  context('the user hits a key', function() {
    it('should move to the right on keystroke of right arrow', function() {
      let keysDown = {39: true};
      let canvas = {width: 1100, height: 600}
      let slime = new Slime({keysDown: keysDown, canvas: canvas});
      assert.equal(slime.x, 275);
      slime.updatePosition(37, 39);
      assert.equal(slime.x, 280);
    });
    it('should move to the left on keystroke of left arrow', function() {
      let keysDown = {37: true}
      let canvas = {width: 1100, height: 600}
      let slime = new Slime({keysDown: keysDown, canvas: canvas});
      assert.equal(slime.x, 275);
      slime.updatePosition(37, 39)
      assert.equal(slime.x, 270);
    });
    it('should not move without a keystroke', function() {
      let keysDown = {}
      let slime = new Slime;
      assert.equal(slime.x, 275);
      slime.updatePosition(37, 39)
      assert.equal(slime.x, 275);
    });
  });
});

describe('Slime', function(){
  context('with default attributes', function(){
    it('should pass attributes to arc on render', function(){
      let context = stub().of('beginPath').of('arc').of('fill')
      let slime = new Slime({context: context});
      assert.equal(slime.context.arc.calls.length, 0)
      slime.render();
      assert.equal(slime.context.arc.calls.length, 1)
      assert.equal(slime.context.arc.calls[0][0], 275)
      assert.equal(slime.context.arc.calls[0][1], 600)
      assert.equal(slime.context.arc.calls[0][2], 80)
      assert.equal(slime.context.arc.calls[0][3], Math.PI)
      assert.equal(slime.context.arc.calls[0][4], false)
    })
    it('should set fillStyle on render', function(){
      let context = stub().of('beginPath').of('arc').of('fill')
      let slime = new Slime({context: context});
      slime.render();
      assert.equal(slime.context.fillStyle, 'red')
    })
    it('should fill on render', function(){
      let context = stub().of('beginPath').of('arc').of('fill')
      let slime = new Slime({context: context});
      assert.equal(slime.context.fill.calls.length, 0)
      slime.render();
      assert.equal(slime.context.fill.calls.length, 1)
    })
  })
})
