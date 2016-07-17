'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Connector = function (_Component) {
  _inherits(Connector, _Component);

  function Connector() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Connector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Connector)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = _this.props.stores, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Connector, [{
    key: 'parseChildProps',
    value: function parseChildProps() {
      var props = { trunks: {} };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _lodash2.default.keys(this.props.stores)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var store_name = _step.value;

          var store = new this.props.stores[store_name](this);
          props.trunks[store_name] = store;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      console.log('childProps', props);
      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactors.View,
        null,
        _react2.default.cloneElement(this.props.children, this.parseChildProps())
      );
    }
  }]);

  return Connector;
}(_react.Component);

function curryActions(actions, connector) {
  var curry = {};

  var _loop = function _loop(action_name) {
    var action = actions[action_name];
    curry[action_name] = function () {
      var wrapper = action.apply(undefined, arguments);
      return wrapper({
        update: function update(value) {
          return connector.setState({ value: value });
        }
      });
    };
  };

  for (var action_name in actions) {
    _loop(action_name);
  }
  return curry;
}

function connect(Component, stores) {
  return function TrunkOpener(props) {
    return _react2.default.createElement(
      Connector,
      { stores: stores },
      _react2.default.createElement(Component, props)
    );
  };
}