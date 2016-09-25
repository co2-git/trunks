'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trunk = function () {
  _createClass(Trunk, null, [{
    key: 'set',
    value: function set(value) {
      var _this = this;

      for (var field in value) {
        this.store = this.store.set(field, value[field]);
      }
      this.trunks.filter(function (trunk) {
        return trunk instanceof _this;
      }).forEach(function (trunk) {
        // checking if mounted in case unmounted trunk has not yet been
        //    removed from list of trunks
        trunk.elem.updater.isMounted(trunk.elem) && trunk.elem.setState({
          changed: trunk.elem.state.changed + 1,
          trunks: _extends({}, trunk.elem.state.trunks, {
            stores: _extends({}, trunk.elem.state.trunks.stores, _defineProperty({}, _this.name, _this.store))
          })
        });
      });
    }
  }, {
    key: 'addTrunk',
    value: function addTrunk(trunk) {
      var _this2 = this;

      if (trunk instanceof this) {
        this.trunks.push(trunk);
      }
      trunk.elem.componentWillUnmount = function () {
        _this2.trunks = _this2.trunks.filter(function (_trunk) {
          return _trunk.id !== trunk.id;
        });
      };
    }
  }]);

  function Trunk(elem) {
    var mounting = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _classCallCheck(this, Trunk);

    this.elem = elem;
    this.name = this.constructor.name;
    this.id = this.constructor.id++;
    if (mounting) {
      this.constructor.addTrunk(this);
    }
  }

  _createClass(Trunk, [{
    key: 'get',
    value: function get(prop) {
      return this.constructor.store.get(prop);
    }
  }, {
    key: 'set',
    value: function set(value) {
      this.constructor.set(value);
    }
  }, {
    key: 'store',
    get: function get() {
      return this.constructor.store;
    }
  }]);

  return Trunk;
}();

Trunk.id = 0;
Trunk.store = _immutable2.default.Map({});
Trunk.map = _immutable2.default.Map;
Trunk.trunks = [];
exports.default = Trunk;