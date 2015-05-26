'use strict';

var fs = require('fs');
var less = require('less');
var register = require('../')(less);

register.helpers({
  assets: function (path) {
    return 'dist/' + path.value + '/assets/css';
  },
  'multiple-args': function (arg1, arg2) {
    return (((arg1.value * 1) + (arg2.value))) + arg1.unit.numerator[0];
  },
  'string-result': function (arg1) {
    return "\"Hello\"";
  },
  'to-rgb': function (color) {
    return 'rgb(' + color.rgb + ')';
  },
  'to-rgba': function (color) {
    return 'rgba(' + color.rgb + ',' + color.alpha + ')';
  },
  'to-hex': function (r, g, b) {
    r = r.value;
    g = g.value;
    b = b.value;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
});

var dir = process.cwd() + '/test/fixtures';
fs.readdirSync(dir).forEach(function (fixture) {
  var str = fs.readFileSync(dir + '/' + fixture, 'utf8');

  less.render(str, function (err, res) {
    if (err) return console.log(err);
    console.log(res.css);
  });
});
