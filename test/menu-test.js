const chai = require('chai');
const assert = chai.assert;
const Menu = require('../lib/scripts/menu')
const stub = require('./support/stub')

describe('Menu', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let context = stub();
      let canvas = stub();
      let menu = new Menu;
      assert.isObject(menu)
      assert.equal(context, context)
      assert.equal(canvas, canvas)
    })
    it('should have default functions', function() {
      let menu = new Menu;
      assert.isFunction(menu.render)
    })
  })
})
