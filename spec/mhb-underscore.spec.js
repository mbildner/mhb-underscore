var _ = require('../mhb-underscore.js');

describe('Collections', function () {
    var testObj;
    var testArr;

    function noOp () {};

    var parent = {inheritableProp: true};
    function Child () {};
    Child.prototype = parent;

    beforeEach(function () {
      testArr = [
        'Moshe Bildner',
        'mbildner',
        'mbildner',
        'New York City'
      ];

      testObj = {
        name: 'Moshe Bildner',
        username: 'mbildner',
        twitter: 'mbildner',
        city: 'New York City'
      };

      testStr = 'moshe bildner';
    });


  describe('map', function () {
    it('should return Array of the return of callback executed on every (character, indx) pair in a String', function () {
      var targetArr = _.map(testStr, function (character, indx) {
        return character;
      });

      expect(targetArr).toEqual(testStr.split(''));

    });

    it('should return Array of the return of callback on every (item, indx) pair in an Array', function () {
      var targetArr = _.map(testArr, function (item, indx) {
        return item;
      });

      expect(targetArr).toEqual(testArr);
    });

    it('should return Array of the return of callback on every (value, key) pair in an Object', function () {
      var targetArr = _.map(testObj, function (val, key) {
        return val;
      });

      expect(targetArr).toEqual([
        'Moshe Bildner',
        'mbildner',
        'mbildner',
        'New York City'
      ]);
    });

    it('should ignore inherited properties in an Object', function () {
      var child = new Child();

      var targetObj = _.map(child, function (val, key) {
        return val;
      });

      expect(targetObj).toEqual({});
    });


    it('should execute callback against context, if provided', function () {
      var context = {
        upperCaser: function (str) {return str.toUpperCase();}
      };

      var targetObj = _.map(testObj, function (val, key) {
        return this.upperCaser(val);
      }, context);

      var targetStr = _.map(testStr, function (character, indx) {
        return this.upperCaser(character);
      }, context);

      var targetArr = _.map(testArr, function (item, indx) {
        return this.upperCaser(item);
      }, context);

      expect(targetObj).toEqual([
        'MOSHE BILDNER',
        'MBILDNER',
        'MBILDNER',
        'NEW YORK CITY'
      ]);

      expect(targetStr).toEqual([
        'M', 'O', 'S', 'H', 'E', ' ', 'B', 'I', 'L', 'D', 'N', 'E', 'R'
      ]);

      expect(targetArr).toEqual([
        'MOSHE BILDNER',
        'MBILDNER',
        'MBILDNER',
        'NEW YORK CITY'
      ]);

    });


  });


  describe('each', function () {
    it('should execute callback on every (character, indx) pair in a String', function () {
      var targetStr = '';

      _.each(testStr, function (character, indx) {
        targetStr += character;
      });

      expect(targetStr).toBe(testStr);

    });

    it('should execute callback on every (item, indx) pair in an Array', function () {
      var targetArr = [];

      _.each(testArr, function (item, indx) {
        targetArr[indx] = item;
      });

      expect(targetArr).toEqual(testArr);

    });

    it('should execute callback on every (value, key) pair in an Object', function () {
      var targetObj = {};

      _.each(testObj, function (val, key) {
        targetObj[key] = val;
      });

      expect(targetObj).toEqual(testObj);
    });

    it('should ignore inherited properties in an Object', function () {
      var child = new Child();

      var targetObj = {};

      _.each(child, function (val, key) {
        targetObj[key] = val;
      });

      expect(targetObj).toEqual({});

    });

    it('should execute callback against context, if provided', function () {
      var context = {
        upperCaser: function (str) {return str.toUpperCase();}
      };

      var targetObj = {};
      var targetArr = [];

      _.each(testObj, function (val, key) {
        targetObj[this.upperCaser(key)] = this.upperCaser(val);
      }, context);

      _.each(testArr, function (item, indx) {
        targetArr[indx] = this.upperCaser(item);
      }, context);

      expect(targetObj).toEqual({
        NAME: 'MOSHE BILDNER',
        USERNAME: 'MBILDNER',
        TWITTER: 'MBILDNER',
        CITY: 'NEW YORK CITY'
      });

      expect(targetArr).toEqual([
        'MOSHE BILDNER',
        'MBILDNER',
        'MBILDNER',
        'NEW YORK CITY'
      ]);

    });

    it('should return the provided list', function () {
      expect(_.each(testStr, noOp)).toBe(testStr);
      expect(_.each(testStr, noOp), {}).toBe(testStr);

      expect(_.each(testObj, noOp)).toBe(testObj);
      expect(_.each(testObj, noOp), {}).toBe(testObj);

      expect(_.each(testArr, noOp)).toBe(testArr);
      expect(_.each(testArr, noOp), {}).toBe(testArr);
    });

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
      // move inheriting Constructor to beforeEach so other tests can use it
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





