'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragResizeContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactResizableBox = require('react-resizable-box');

var _reactResizableBox2 = _interopRequireDefault(_reactResizableBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragResize = function (_React$Component) {
  _inherits(DragResize, _React$Component);

  function DragResize() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DragResize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragResize.__proto__ || Object.getPrototypeOf(DragResize)).call.apply(_ref, [this].concat(args))), _this), _this.getDragProps = function () {
      return _extends({
        bounds: 'parent',
        defaultPosition: { x: 0, y: 0 }
      }, _this.props.dragProps);
    }, _this.getResizeProps = function () {
      return _extends({
        width: 200,
        height: 100,
        minWidth: 100,
        minHeight: 80
      }, _this.props.resizeProps);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DragResize, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return React.createElement(
        _reactDraggable2.default,
        this.getDragProps(),
        React.createElement(
          'div',
          { style: boxStyle },
          React.createElement(
            _reactResizableBox2.default,
            this.getResizeProps(),
            children
          )
        )
      );
    }
  }]);

  return DragResize;
}(React.Component);

exports.default = DragResize;
var DragResizeContainer = exports.DragResizeContainer = function DragResizeContainer(_ref2) {
  var children = _ref2.children;

  return React.createElement(
    'div',
    { style: contianerStyle },
    children
  );
};

var contianerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

var boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  display: 'inline-block',
  position: 'absolute'
};