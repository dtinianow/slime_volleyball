const chai = require('chai');
const assert = chai.assert;
const Net = require('../lib/scripts/net')
const stub = require('./support/stub')

describe('Net', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let net = new Net;
      assert.isObject(net);
    })
    it('should have a default x-coordinate', function() {
      let net = new Net;
      assert.equal(net.x, 545);
    })
    it('should have a default y-coordinate', function() {
      let net = new Net;
      assert.equal(net.y, 600);
    })
    it('should have a default width', function() {
      let net = new Net;
      assert.equal(net.width, 10);
    })
    it('should have a default height', function() {
      let net = new Net;
      assert.equal(net.height, -80);
    })
    it('should have a default color', function() {
      let net = new Net;
      assert.equal(net.color, '#33334d');
    })
    it('should have a default context', function() {
      let context = 'context';
      let net = new Net(context);
      assert.equal(net.context, 'context');
    })
    it('should be able to render', function() {
      let net = new Net;
      assert.isFunction(net.render);
    })
  });
});

describe('Render', function() {
  context('the page loads', function() {
    it('should render the net', function() {
      var context = stub().of('fillRect').of('fill');
      let net = new Net(context);
      assert.equal(net.x, 545)
      assert.equal(net.context.fillRect.calls.length, 0)
      net.render();
      assert.equal(net.context.fillRect.calls.length, 1)
    });
  });
});
