const chai = require('chai');
const assert = chai.assert;
const Menu = require('../lib/scripts/menu');
const stub = require('./support/stub');

describe('Menu', function() {
  context('with default attributes', function() {
    it('should be instantiated', function() {
      let context = stub();
      let canvas = stub();
      let menu = new Menu();
      assert.isObject(menu);
      assert.equal(context, context);
      assert.equal(canvas, canvas);
    });
    it('should have default functions', function() {
      let menu = new Menu();
      assert.isFunction(menu.render);
      assert.isFunction(menu.displayOptions);
      assert.isFunction(menu.getInstructions);
      assert.isFunction(menu.player1Instructions);
      assert.isFunction(menu.player2Instructions);
      assert.isFunction(menu.changeBackgroundInstructions);
      assert.isFunction(menu.returnToMainMenuInstructions);
    });
    it('should render player 1 instructions', function() {
      var context = stub().of('fillText').of('fill');
      var canvas = stub();
      let menu = new Menu({context: context, canvas: canvas});
      assert.equal(menu.context.fillText.calls.length, 0);
      menu.player1Instructions();
      assert.equal(menu.context.fillText.calls.length, 4);
    });
    it('should render player 2 instructions', function() {
      var context = stub().of('fillText').of('fill');
      var canvas = stub();
      let menu = new Menu({context: context, canvas: canvas});
      assert.equal(menu.context.fillText.calls.length, 0);
      menu.player2Instructions();
      assert.equal(menu.context.fillText.calls.length, 4);
    });
    it('should render menu instructions', function() {
      var context = stub().of('fillText').of('fill');
      var canvas = stub();
      let menu = new Menu({context: context, canvas: canvas});
      assert.equal(menu.context.fillText.calls.length, 0);
      menu.render();
      assert.equal(menu.context.fillText.calls.length, 6);
    });
    it('should render change background instructions', function() {
      var context = stub().of('fillText').of('fill');
      var canvas = stub();
      let menu = new Menu({context: context, canvas: canvas});
      assert.equal(menu.context.fillText.calls.length, 0);
      menu.changeBackgroundInstructions();
      assert.equal(menu.context.fillText.calls.length, 1);
    });
    it('should render return to menu instructions', function() {
      var context = stub().of('fillText').of('fill');
      var canvas = stub();
      let menu = new Menu({context: context, canvas: canvas});
      assert.equal(menu.context.fillText.calls.length, 0);
      menu.returnToMainMenuInstructions();
      assert.equal(menu.context.fillText.calls.length, 1);
    });
  });
});
