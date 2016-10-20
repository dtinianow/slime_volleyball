const chai = require('chai');
const assert = chai.assert;
const Slime = require('../lib/scripts/slime');
const stub = require('./support/stub');

describe('Slime', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let slime = new Slime();
      assert.isObject(slime);
    });
    it('should have a default attributes', function() {
      let context = stub();
      let canvas = stub();
      let player = stub();
      let ball = stub();
      let slime = new Slime({context: context, canvas: canvas, player: player, ball: ball});
      assert.equal(slime.x, 275);
      assert.equal(slime.y, 600);
      assert.equal(slime.radius, 80);
      assert.equal(slime.speed, 3);
      assert.equal(slime.color, 'red');
      assert.equal(slime.jumping, false);
    });
    it('should have given attributes', function() {
      let attributes = {x: 1, y: 1, speed: 4, color: 'blue'};
      let slime = new Slime(attributes);
      assert.equal(slime.x, 1);
      assert.equal(slime.y, 1);
      assert.equal(slime.speed, 4);
      assert.equal(slime.color, 'blue');
    });
    it('should have default functions', function(){
      let slime = new Slime();
      assert.isFunction(slime.render);
      assert.isFunction(slime.drawSlime);
      assert.isFunction(slime.drawEyes);
      assert.isFunction(slime.shouldDrawPlayer1Eye);
      assert.isFunction(slime.shouldDrawPlayer2Eye);
      assert.isFunction(slime.drawPlayer1Eye);
      assert.isFunction(slime.drawPlayer2Eye);
      assert.isFunction(slime.fillEyes);
      assert.isFunction(slime.drawPupils);
      assert.isFunction(slime.shouldDrawPlayer1Pupil);
      assert.isFunction(slime.shouldDrawPlayer2Pupil);
      assert.isFunction(slime.drawPlayer1Pupil);
      assert.isFunction(slime.drawPlayer2Pupil);
      assert.isFunction(slime.move);
      assert.isFunction(slime.updatePosition);
      assert.isFunction(slime.ifMoveRight);
      assert.isFunction(slime.ifMoveLeft);
      assert.isFunction(slime.ifFinishJump);
      assert.isFunction(slime.ifJumping);
      assert.isFunction(slime.isNotTouchingRightWall);
      assert.isFunction(slime.isNotTouchingLeftSideOfNet);
      assert.isFunction(slime.isNotTouchingLeftWall);
      assert.isFunction(slime.isNotTouchingRightSideOfNet);
      assert.isFunction(slime.isOnTheGround);
      assert.isFunction(slime.moveToRight);
      assert.isFunction(slime.moveToLeft);
      assert.isFunction(slime.finishJump);
      assert.isFunction(slime.ifStayingStill);
      assert.isFunction(slime.jump);
      assert.isFunction(slime.resetPosition);
    });
  });
});

describe('Move', function() {
  context('when the slimes moves', function() {
    it('should change x-coordinates', function() {
      let slime = new Slime();
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
      let canvas = {width: 1100, height: 600};
      let slime = new Slime({keysDown: keysDown, canvas: canvas});
      assert.equal(slime.x, 275);
      slime.updatePosition(37, 39);
      assert.equal(slime.x, 285);
    });
    it('should move to the left on keystroke of left arrow', function() {
      let keysDown = {37: true};
      let canvas = {width: 1100, height: 600};
      let slime = new Slime({keysDown: keysDown, canvas: canvas});
      assert.equal(slime.x, 275);
      slime.updatePosition(37, 39);
      assert.equal(slime.x, 265);
    });
    it('should not move without a keystroke', function() {
      let slime = new Slime();
      assert.equal(slime.x, 275);
      slime.updatePosition(37, 39);
      assert.equal(slime.x, 275);
    });
  });
});

describe('Slime', function(){
  context('with default attributes', function(){
    it('should pass attributes to arc on render', function(){
      let context = stub().of('drawSlime').of('beginPath').of('arc').of('fill').of('closePath');
      let slime = new Slime({context: context});
      assert.equal(slime.context.arc.calls.length, 0);
      slime.render();
      assert.equal(slime.context.arc.calls.length, 1);
      assert.equal(slime.context.arc.calls[0][0], 275);
      assert.equal(slime.context.arc.calls[0][1], 600);
      assert.equal(slime.context.arc.calls[0][2], 80);
      assert.equal(slime.context.arc.calls[0][3], Math.PI);
      assert.equal(slime.context.arc.calls[0][4], false);
    });
    it('should set fillStyle on render', function(){
      let context = stub().of('beginPath').of('arc').of('fill').of('closePath');
      let slime = new Slime({context: context});
      slime.render();
      assert.equal(slime.context.fillStyle, 'black');
    });
    it('should fill on render', function(){
      let context = stub().of('beginPath').of('arc').of('fill').of('closePath');
      let slime = new Slime({context: context});
      assert.equal(slime.context.fill.calls.length, 0);
      slime.render();
    });
  });
});
