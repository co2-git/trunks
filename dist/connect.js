'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export class Connector extends Component {
//   state = this.props.stores;
//   mounted = false;
//   mounting = true;
//   updated = false;
//   componentDidMount() {
//     this.mounted = true;
//   }
//   componentWillUpdate() {
//     this.mounting = false;
//   }
//   componentDidUpdate() {
//     this.updated = true;
//   }
//   parseChildProps() {
//     console.log('parsing');
//     const props = {trunks: {}};
//     for (const store_name of Object.keys(this.props.stores)) {
//       const Store = this.props.stores[store_name];
//       const store = new Store(this, this.mounting);
//       props.trunks[store_name] = store;
//     }
//     return props;
//   }
//   render() {
//     return React.cloneElement(
//       this.props.children,
//       this.parseChildProps()
//     );
//   }
// }

var Connector = exports.Connector = function (_Component) {
  _inherits(Connector, _Component);

  function Connector(props) {
    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Connector).call(this, props));

    _this.state = {
      changed: 0,
      trunks: {
        actions: {},
        stores: {}
      }
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(_this.props.stores)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var storeName = _step.value;

        var Store = _this.props.stores[storeName];
        var store = new Store(_this, true);
        _this.state.trunks.actions[storeName] = {};
        _this.state.trunks.stores[storeName] = store.store;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.getOwnPropertyNames(Store.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var prop = _step2.value;

            if (typeof store[prop] === 'function' && prop !== 'constructor') {
              _this.state.trunks.actions[storeName][prop] = store[prop].bind(store);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
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

    return _this;
  }

  _createClass(Connector, [{
    key: 'render',
    value: function render() {
      return _react2.default.cloneElement(this.props.children, this.state);
    }
  }]);

  return Connector;
}(_react.Component);

function connect(Component, stores) {
  function TrunkOpener(props) {
    return _react2.default.createElement(
      Connector,
      { stores: stores },
      _react2.default.createElement(Component, props)
    );
  }
  TrunkOpener.displayName = Component.displayName || Component.name;
  console.log('Connecting trunk', TrunkOpener.displayName);
  return TrunkOpener;
}