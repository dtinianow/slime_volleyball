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
    it('it appears on screen', function() {
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
    it('it moves on screen', function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      assert.equal(ball.y, 300)
      ball.movement();
      assert.equal(ball.y, 305.8)
      assert.equal(ball.x, 275)
    })
    it('it sets speed', function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      assert.equal(ball.y_speed, 5)
      ball.difficulty = "insane"
      ball.setSpeed("insane");
      assert.equal(ball.y_speed, 25)
      ball.difficulty = "normal"
      ball.setSpeed("normal");
      assert.equal(ball.y_speed, 5)
    })
    it('it resets after point', function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      ball.y = 400
      ball.x_speed = 19
      ball.resetAfterPoint("normal");
      assert.equal(ball.y_speed, 5)
      assert.equal(ball.y, 300)
      assert.equal(ball.x_speed, 0)
    })
    it("it knows it's touching the ceiling", function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      ball.y = -100
      assert.notStrictEqual(ball.isTouchingCeiling, true);
    })
    it("it knows it's touching the net", function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      ball.y = 800
      ball.x = 550
      assert.notStrictEqual(ball.isTouchingNet, true);
    })
    it("it knows it's touching the ground", function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      ball.y = 800
      assert.notStrictEqual(ball.isTouchingNet, true);
    })
    it("it knows it's touching the wall", function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      ball.x = 1100
      assert.notStrictEqual(ball.isTouchingNet, true);
    })
    it("it knows it's touching slime", function() {
      let context = stub().of('beginPath').of('arc').of('fill');
      let ball = new Ball({context: context})
      ball.x = 225
      ball.y = 800
      assert.notStrictEqual(ball.isTouchingNet, true);
    })
  })
})
