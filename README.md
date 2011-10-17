About
=====
Fully compatible with CoffeeScript
It's the base on CoffeeScript and with some improvements.

Additional Features
===================
1. Asynchronous
2. String In Symbol Style
3. RegExp operator =~
4. RegExp Magic Identifier ```\& \~ \1..9```

### 1. Asynchronous

Grammar: add '!' to the end of the function name

Input:

    do ->
      # ! always is a function
      foo_0_0!
      @va = obj.foo_2_1! 'pa', 'pb'
      # @ is inherited
      [va, @vb] = obj::foo_2_2! 'pa', 'pb'

    # another async block
    do ->
      @va = @foo! 'pa'

    # if, while and so on has block too
    if true
      va = foo!
    else
      vb = foo!

Output:

    var _this = this;

    (function() {
      var _this = this;
      return foo_0_0(function() {
        return obj.foo_2_1('pa', 'pb', function(va) {
          return obj.prototype.foo_2_2('pa', 'pb', function(va, vb) {
            _this.vb = vb;
          });
        });
      });
    })();

    (function() {
      var _this = this;
      return this.foo('pa', function(va) {
        _this.va = va;
      });
    })();

    if (true) {
      foo(function(va) {});
    } else {
      foo(function(vb) {});
    }

### 2. String in Symbol style
It's the similar to Ruby Symbol, but it's just a String, use for the easier to write string.

Grammar: /^\:((?:\\.|\w|-)+)/

Remark:- is valid character of the symbol

Example:

    :hello_world
    :hello-world

Output:

    'hello_world'
    'hello-world'

### 3. RegExp operator =~
Grammar: String =~ RegExp
Example:

    "hello" =~ /\w+/

Output:

    (function() {
      var __matches = null;
      __matches = "hello".match(/\w+/);
    }).call(this);
    

### 4. RegExp Magic Identifier \& \~ \1..9
Magic Identifiers:

    \~: the match
    \&: match[0]
    \1: match[1]
    \2: match[2]
    ...
    \9: match[9]

Example:

    if :hello =~ /^\w+$/
      console.info :matched

    if :333-444 =~ /^(\d+)-(\d+)$/
      console.info \1, \2

Output:

    (function() {
      var __matches = null;
      if (__matches = 'hello'.match(/^\w+$/)) console.info('matched');
      if (__matches = '333-444'.match(/^(\d+)-(\d+)$/)) {
        console.info(__matches[1], __matches[2]);
      }
    }).call(this);

