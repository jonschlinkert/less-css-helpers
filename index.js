/*!
 * less-css-helpers <https://github.com/jonschlinkert/less-css-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');

module.exports = function register(less, options) {
  options = options || {};
  less.helpers = less.functions.functionRegistry._data;
  var render = less.render;

  less.render = function (str, opts, cb) {
    extend(options, opts);
    return render.call(less, str, opts, cb);
  };

  exports.helper = function(name, fn) {
    if (typeof name !== 'string') {
      throw new TypeError('less-helpers.helper expects `name` to be a string.');
    }

    var key = name.toLowerCase();
    if (options.strict && less.helpers.hasOwnProperty(key.toLowerCase())) {
      return;
    }

    less.functions.functionRegistry.add(key, function () {
      this.less = less;
      if (!('options' in this)) {
        this.options = options;
      }
      if (!('data' in this)) {
        this.data = options.data || {};
      }
      if (!('file' in this)) {
        this.file = options.file || {};
      }
      var res = fn.apply(this, arguments);
      return typeof res !== "object"
        ? new less.tree.Anonymous(res)
        : res;
    });
  };

  exports.helpers = function(helpers) {
    if (typeof helpers !== 'object') {
      throw new TypeError('less-helpers.helpers expects `helpers` to be an object.');
    }
    for (var name in helpers) {
      exports.helper(name, helpers[name]);
    }
  };
  return exports;
};
