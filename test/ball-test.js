const chai = require('chai');
const assert = chai.assert;
const Ball = require('../lib/scripts/ball')
const stub = require('./support/stub')

describe('Ball', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let context = stub();
      let canvas = stub();
      let ball = new Ball({context: context, canvas: canvas});
      assert.isObject(ball);
      assert.equal(ball.x, 275);
      assert.equal(ball.y, 300);
      assert.equal(ball.radius, 20);
      assert.equal(ball.x_speed, 0);
      assert.equal(ball.y_speed, 5);
      assert.equal(ball.color, "white");
      assert.equal(ball.context, context);
    })
  })
  context('with default functions', function() {
    it('should be instantiated', function() {
      let context = stub();
      let canvas = stub();
      let ball = new Ball({context: context, canvas: canvas});
      assert.isFunction(ball.render);
      assert.isFunction(ball.isTouchingSlime);
      assert.isFunction(ball.bounce);
      assert.isFunction(ball.isTouchingWall);
      assert.isFunction(ball.isTouchingGround);
      assert.isFunction(ball.isTouchingNet);
      assert.isFunction(ball.isTouchingCeiling);
      assert.isFunction(ball.resetAfterPoint);
      assert.isFunction(ball.setSpeed);
    })
  })
})

describe('Render', function() {
  context('Ball should be rendered', function() {
    xit('it appears on screen', function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      assert.equal(ball.context.arc.calls.length, 0)
      ball.render();
      assert.equal(ball.context.arc.calls.length, 1)
      assert.equal(ball.context.arc.calls[0][0], ball.x)
      assert.equal(ball.context.arc.calls[0][1], ball.y)
      assert.equal(ball.context.arc.calls[0][2], ball.radius)
      assert.equal(ball.context.arc.calls[0][3], (Math.PI * 2))
      assert.equal(ball.context.arc.calls[0][4], false)
    })
  })
})
