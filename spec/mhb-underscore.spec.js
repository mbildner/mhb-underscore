var _ = require('../mhb-underscore.js');

describe('Collections', function () {
  it('should invoke a callback on each value in an object', function () {
    var labels = '';
    var counter = 0;
    var additionObj = {
      one: 1,
      seven: 7,
      negFive: -5
    };

    _.each(additionObj, function (num, label) {
      counter += num;
    });

    expect(counter).toBe(3);

    _.each(additionObj, function (num, label) {
      labels += label;
    });

    expect(labels).toBe('onesevennegFive');

  });


});


describe('Objects', function () {
  describe('pairs', function () {
    it('should split an object into arrays of [key, value]', function () {
      var user = {
        address: {
          city: 'New York City',
          state: 'NY'
        },
        username: 'mbildner',
        languages: [
          'English',
          'JavaScript'
        ]
      };

      var pairs = _.pairs(user);

      expect(pairs).toEqual([
        ['address', {city: 'New York City', state: 'NY'}],
        ['username', 'mbildner'],
        ['languages', ['English', 'JavaScript']]
      ]);
    });

    it('should return an empty array for empty object literal', function () {
      expect(_.pairs({})).toEqual([]);
    });

    it('should return an empty array for new-constructed empty Object', function () {
      expect(_.pairs(new Object())).toEqual([]);
    });

    it('should filter out inherited properties', function () {
      var parent = {name: 'PARENT'};
      function Child () {
        this.ownName = 'CHILD'
      };
      Child.prototype = parent;
      var child = new Child();

      expect(_.pairs(child)).toEqual([
        ['ownName', 'CHILD']
      ]);

    });


  });
});


describe('type testers', function () {
  describe('isBoolean', function () {
    it('should pass Boolean literals', function () {
      expect(_.isBoolean(true)).toBe(true);
      expect(_.isBoolean(false)).toBe(true);
    });

    it('should pass new-constructed Booleans', function () {
      var _true = new Boolean(true);
      var _false = new Boolean(false);

      expect(_.isBoolean(_true)).toBe(true);
      expect(_.isBoolean(_false)).toBe(true);

    });

    it('should fail non-Boolean literals', function () {
      expect(_.isBoolean('abc')).toBe(false);
      expect(_.isBoolean(123)).toBe(false);
      expect(_.isBoolean([])).toBe(false);
      expect(_.isBoolean({})).toBe(false);
    });

    it('should fail new-constructed non-Booleans', function () {
      expect(_.isBoolean(new String('abc'))).toBe(false);
      expect(_.isBoolean(new Number(123))).toBe(false);
      expect(_.isBoolean(new Array())).toBe(false);
      expect(_.isBoolean(new Object())).toBe(false);
    });

  });

  describe('isNumber', function () {
    it('should pass Number literals', function () {
      expect(_.isNumber(123)).toBe(true);
      expect(_.isNumber(0.123)).toBe(true);
    });

    it('should pass new-constructed booleans', function () {
      var _int = new Number(123);
      var _float = new Number(0.123);

      expect(_.isNumber(_int)).toBe(true);
      expect(_.isNumber(_float)).toBe(true);

    });

    it('should fail non-Number literals', function () {
      expect(_.isNumber('abc')).toBe(false);
      expect(_.isNumber(true)).toBe(false);
      expect(_.isNumber([])).toBe(false);
      expect(_.isNumber({})).toBe(false);
    });

    it('should fail new-constructed non-Numbers', function () {
      expect(_.isNumber(new String('abc'))).toBe(false);
      expect(_.isNumber(new Boolean(true))).toBe(false);
      expect(_.isNumber(new Array())).toBe(false);
      expect(_.isNumber(new Object())).toBe(false);
    });

  });


  describe('isArray', function () {
    it('should pass Array literals', function () {
      expect(_.isArray([])).toBe(true);
    });

    it('should pass new-constructed Array', function () {
      var _sized = new Array(12);
      var _unsized = new Array();

      expect(_.isArray(_sized)).toBe(true);
      expect(_.isArray(_unsized)).toBe(true);

    });

    it('should fail non-Array literals', function () {
      expect(_.isArray('abc')).toBe(false);
      expect(_.isArray(true)).toBe(false);
      expect(_.isArray(12)).toBe(false);
      expect(_.isArray({})).toBe(false);
    });

    it('should fail new-constructed non-Arrays', function () {
      expect(_.isArray(new String('abc'))).toBe(false);
      expect(_.isArray(new Boolean(true))).toBe(false);
      expect(_.isArray(new Number(12))).toBe(false);
      expect(_.isArray(new Object())).toBe(false);
    });

  });

  describe('isObject', function () {
    it('should pass Object literals', function () {
      expect(_.isObject({})).toBe(true);
    });

    it('should pass new-constructed Object', function () {
      expect(_.isObject(new Object())).toBe(true);

    });

    it('should fail non-Object literals', function () {
      expect(_.isObject('abc')).toBe(false);
      expect(_.isObject(true)).toBe(false);
      expect(_.isObject(12)).toBe(false);
      expect(_.isObject([])).toBe(false);
    });

    it('should fail new-constructed non-Objects', function () {
      expect(_.isObject(new String('abc'))).toBe(false);
      expect(_.isObject(new Boolean(true))).toBe(false);
      expect(_.isObject(new Number(12))).toBe(false);
      expect(_.isObject(new Array())).toBe(false);
    });

  });


  describe('isString', function () {
      it('should pass String literals', function () {
        expect(_.isString('')).toBe(true);
        expect(_.isString('this is a string')).toBe(true);
      });

      it('should pass new-constructed String', function () {
        expect(_.isString(new String())).toBe(true);
      });

      it('should fail non-String literals', function () {
        expect(_.isString({})).toBe(false);
        expect(_.isString(true)).toBe(false);
        expect(_.isString(12)).toBe(false);
        expect(_.isString([])).toBe(false);
      });

      it('should fail new-constructed non-Strings', function () {
        expect(_.isString(new Object({}))).toBe(false);
        expect(_.isString(new Boolean(true))).toBe(false);
        expect(_.isString(new Number(12))).toBe(false);
        expect(_.isString(new Array())).toBe(false);
      });

    });


});





