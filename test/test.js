/*!
 * less-helpers <https://github.com/jonschlinkert/less-helpers>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps: mocha */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var less = require('less');
var register = require('../')(less);

function read(fp) {
  fp = path.join(process.cwd(), 'test/fixtures', fp);
  return fs.readFileSync(fp, 'utf8');
}

describe('.helper', function () {
  beforeEach(function () {
    register.helper('a', function () {
      return 'z';
    });
  })

  it('should add the `less.helpers` object:', function () {
    assert.equal(typeof less.helpers, 'object');
  });

  it('should register a helper on `less.helpers`:', function () {
    assert.equal(typeof less.helpers.a, 'function');
  });

  it('should use a helper:', function () {
    less.render(read('a.less'), function (err, res) {
      if (err) return console.log(err);
      assert.equal(/z\/b\/c\.d/.test(res.css), true);
    });
  });

  it('should throw an error:', function () {
    assert.throws(function () {
      register.helper();
    }, 'less-helpers.helper expects `name` to be a string.');
  });
});

describe('.helpers', function () {
  beforeEach(function () {
    register.helpers({
      aaa: function () {},
      bbb: function () {},
      ccc: function () {},
      ddd: function () {},
    });
  })

  it('should register an object of helpers on `less.helpers`:', function () {
    assert.equal(typeof less.helpers.aaa, 'function');
    assert.equal(typeof less.helpers.bbb, 'function');
    assert.equal(typeof less.helpers.ccc, 'function');
    assert.equal(typeof less.helpers.ddd, 'function');
  });

  it('should throw an error:', function () {
    assert.throws(function () {
      register.helpers();
    }, 'less-helpers.helpers expects `helpers` to be an object.');
  });
});
