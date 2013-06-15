// Generated by ToffeeScript 1.6.2-6
var code_eq, p, _ref;

_ref = require('./helper'), p = _ref.p, code_eq = _ref.code_eq;

describe('autocb', function() {
  it('simple', function() {
    return code_eq("x = (autocb)->", "function x(autocb) {\n  autocb();\n};\n");
  });
  it('simple 2', function() {
    return code_eq("x = (autocb) ->\n	y!", "function x(autocb) {\n  var _this = this;\n  y(function(_$$_0) {\n	autocb(_$$_0);\n  });\n};");
  });
  it('simple 3', function() {
    return code_eq("x = (autocb) ->\n	x = y!", "function x(autocb) {\n  var _this = this;\n  y(function() {\n	autocb(x = arguments[0]);\n  });\n};");
  });
  return it('empty return', function() {
    return code_eq("x = (autocb)-> return", "function x(autocb) {\n  return autocb();\n};");
  });
});
