"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trunk = function () {
  _createClass(Trunk, null, [{
    key: "set",
    value: function set(value) {
      var _this = this;

      this.store = _extends({}, this.store, value);
      this.trunks.forEach(function (trunk) {
        return trunk.setState(_defineProperty({}, _this.name, _extends({}, _this.store, value)));
      });
    }
  }]);

  function Trunk(elem) {
    _classCallCheck(this, Trunk);

    this.elem = elem;
    this.constructor.trunks.push(this);
  }

  _createClass(Trunk, [{
    key: "get",
    value: function get() {
      return this.constructor.store;
    }
  }, {
    key: "set",
    value: function set(value) {
      var _Trunk = this.constructor;
      _Trunk.set(value);
      this.elem.setState(_defineProperty({}, _Trunk.name, _extends({}, _Trunk.store, value)));
    }
  }, {
    key: "store",
    get: function get() {
      return this.constructor.store;
    }
  }]);

  return Trunk;
}();

Trunk.store = {};
Trunk.trunks = [];
exports.default = Trunk;