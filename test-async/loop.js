// Generated by CoffeeScript 1.6.2
var code_eq, p, _ref;

_ref = require('./helper'), p = _ref.p, code_eq = _ref.code_eq;

describe('for', function() {
  it('simple', function() {
    return code_eq("for i in [1..3]\n	x!\nnull", "var i,\n	_this = this;\n\n(function(_$cb$_0) {\n	var _body, _i, _step;\n	i = _i = 1;\n	_step = function() {\n		i = ++_i;\n		_body();\n	};\n	_body = function() {\n		if (_i <= 3) {\n			x(function(_$$_1) {\n				_step(_$$_1);\n			});\n		} else {\n			_$cb$_0();\n		}\n	};\n	_body();\n})(function() {\n	return null;\n});");
  });
  it('returns', function() {
    return code_eq("xs = for i in [1..3]\n	x!\nnull", "var i, xs;\n(function(cb) {\n	var res, _body, _done, _i, _step;\n	res = []\n	i = _i = 1;\n	_step = function() {\n		i = ++_i;\n		_body();\n	}\n	_body = function() {\n		if (_i <= 3) {\n			x(function(v) {\n				_step(res.push(v));\n			});\n		} else {\n			_done();\n		}\n	}\n	_done = function() {\n		cb(res);\n	}\n	_body();\n})(function() {\n	xs = arguments[0]\n	return null;\n});");
  });
  it('guard', function() {
    return code_eq("for i in [1..3] when i > 10\n	x!\nnull", "var i;\n(function(cb) {\n	var _body, _i, _step;\n	i = _i = 1;\n	_step = function() {\n		i = ++_i;\n		_body();\n	}\n	_body = function() {\n		if (_i <= 3) {\n			if (i > 10) {\n				x(function(v) {\n					_step(v);\n				});\n			} else {\n				_step();\n			}\n		} else {\n			cb()\n		}\n	}\n	_body();\n})(function() {\n	return null;\n});");
  });
  it('pluckdirectcall', function() {
    return code_eq("for i in [1..10]\n	c = b!\nnull", "var c, i,\n	_this = this;\n\n(function(_$cb$_0) {\n	var _body, _i, _step;\n	i = _i = 1;\n	_step = function() {\n		i = ++_i;\n		_body();\n	};\n	_body = function() {\n		if (_i <= 10) {\n			b(function() {\n				_step(c = arguments[0]);\n			});\n		} else {\n			_$cb$_0();\n		}\n	};\n	_body();\n})(function() {\n	return null;\n});");
  });
  it('end with async condition', function() {
    return code_eq("res = for x in a\n	if y = b\n		z = c!", "var res, x, y, z,\n  _this = this;\n\n(function(_$cb$_0) {\n  var _$res$_1, _body, _done, _i, _len, _step;\n  _$res$_1 = [];\n  _i = 0, _len = a.length;\n  _step = function() {\n	_i++;\n	_body();\n  };\n  _body = function() {\n	if (_i < _len) {\n	  x = a[_i];\n	  if (y = b) {\n		(function(_$cb$_3) {\n		  c(function() {\n			_$cb$_3(z = arguments[0]);\n		  });\n		})(function(_$$_2) {\n		  _step(_$res$_1.push(_$$_2));\n		});\n	  } else {\n		_step(_$res$_1.push(void 0));\n	  }\n	} else {\n	  _done();\n	}\n  };\n  _done = function() {\n	_$cb$_0(_$res$_1);\n  };\n  _body();\n})(function() {\n  return res = arguments[0];\n});");
  });
  return it('nested for', function() {
    return code_eq("for x in a\n	for y in b\n		c!\nnull", "var x, y,\n  _this = this;\n\n(function(_$cb$_1) {\n  var _body, _i, _len, _step;\n  _i = 0, _len = a.length;\n  _step = function() {\n	_i++;\n	_body();\n  };\n  _body = function() {\n	if (_i < _len) {\n	  x = a[_i];\n	  (function(_$cb$_0) {\n		var _body1, _j, _len1, _step1;\n		_j = 0, _len1 = b.length;\n		_step1 = function() {\n		  _j++;\n		  _body1();\n		};\n		_body1 = function() {\n		  if (_j < _len1) {\n			y = b[_j];\n			c(function(_$$_3) {\n			  _step1(_$$_3);\n			});\n		  } else {\n			_$cb$_0();\n		  }\n		};\n		_body1();\n	  })(function(_$$_2) {\n		_step(_$$_2);\n	  });\n	} else {\n	  _$cb$_1();\n	}\n  };\n  _body();\n})(function() {\n  return null;\n});");
  });
});

describe('while', function() {
  it('simple', function() {
    return code_eq("while true\n	x!\nnull", "(function(cb) {\n	var _body;\n	_body = function() {\n		if (true) {\n			x(function(v) {\n				_body(v);\n			});\n		} else {\n			cb();\n		}\n	}\n	_body();\n})(function() {\n	return null;\n});");
  });
  it('returns', function() {
    return code_eq("xs = while true\n	x!\nnull", "var xs;\n(function(cb) {\n	var res, _body, _done;\n	res = []\n	_body = function() {\n		if (true) {\n			x(function(v) {\n				_body(res.push(v));\n			});\n		} else {\n			cb();\n		}\n	}\n	_done = function() {\n		cb(res);\n	}\n	_body();\n})(function() {\n	xs = arguments[0]\n	return null;\n});");
  });
  return it('for own of', function() {
    return code_eq("for own k, v of vs\n	x!\nnull", "var k, v, _$$_0, _$$_1,\n	__hasProp = {}.hasOwnProperty,\n_this = this;\n\n_$$_1 = (function() {\n	var _results;\n	_results = [];\n	for (_$$_0 in vs) {\n		if (!__hasProp.call(vs, _$$_0)) continue;\n			_results.push(_$$_0);\n	}\n	return _results;\n})();\n\n(function(_$cb$_2) {\n	var _body, _i, _len, _step;\n	_i = 0, _len = _$$_1.length;\n	_step = function() {\n		_i++;\n		_body();\n	};\n	_body = function() {\n		if (_i < _len) {\n			k = _$$_1[_i];\n			v = vs[k];\n			x(function(_$$_3) {\n				_step(_$$_3);\n			});\n		} else {\n			_$cb$_2();\n		}\n	};\n	_body();\n})(function() {\n	return null;\n});");
  });
});
