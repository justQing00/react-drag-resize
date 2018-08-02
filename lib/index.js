'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDom = _interopRequireWildcard(_reactDom);

var _dragResize = require('./drag-resize');

var _dragResize2 = _interopRequireDefault(_dragResize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragResizeContainer = function (_React$Component) {
  _inherits(DragResizeContainer, _React$Component);

  function DragResizeContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DragResizeContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragResizeContainer.__proto__ || Object.getPrototypeOf(DragResizeContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      parentNode: null
    }, _this.onResizeStart = function (key) {
      return function (e, direction, refToElement, delta) {
        var _ref2 = _this.props.resizeProps || {},
            onResizeStart = _ref2.onResizeStart;

        if (onResizeStart) onResizeStart(e, direction, refToElement, delta);
        _this.currentChildMap = _extends({}, _this.childrenMap[key]);
      };
    }, _this.onResize = function (key) {
      return function (e, direction, refToElement, delta) {
        var _ref3 = _this.props.resizeProps || {},
            onResize = _ref3.onResize;

        if (onResize) onResize(e, direction, refToElement, delta);
        var _this$props$scale = _this.props.scale,
            scale = _this$props$scale === undefined ? 1 : _this$props$scale;

        if (key) _this.childrenMap[key] = Object.assign({}, _this.childrenMap[key], getResizePositionTemp({ currentChildMap: _this.currentChildMap, direction: direction, delta: delta, scale: scale }));
        if (scale === 1) return;
        _this.onLayoutChange();
      };
    }, _this.onResizeStop = function () {
      return function (e, direction, refToElement, delta) {
        var _ref4 = _this.props.resizeProps || {},
            onResizeStop = _ref4.onResizeStop;

        if (onResizeStop) onResizeStop(e, direction, refToElement, delta);
        _this.currentChildMap = null;
        var _this$props$scale2 = _this.props.scale,
            scale = _this$props$scale2 === undefined ? 1 : _this$props$scale2;

        if (scale !== 1) return;
        _this.onLayoutChange();
      };
    }, _this.onDragStop = function (key) {
      return function (e, position) {
        var _ref5 = _this.props.dragProps || {},
            onStop = _ref5.onStop;

        var _this$props$scale3 = _this.props.scale,
            scale = _this$props$scale3 === undefined ? 1 : _this$props$scale3;

        if (onStop) onStop(e, position);
        if (scale !== 1) {
          // if scale exists
          _this.onLayoutChange();
          return false;
        }
        var temp = { x: position.x, y: position.y };
        if (key) _this.childrenMap[key] = Object.assign({}, _this.childrenMap[key], temp);
        _this.onLayoutChange();
        _this.setState({}); // force update when drag
      };
    }, _this.onDrag = function (key) {
      return function (e, position) {
        var _ref6 = _this.props.dragProps || {},
            onDrag = _ref6.onDrag;

        if (onDrag) onDrag(e, position);
        var _this$props$scale4 = _this.props.scale,
            scale = _this$props$scale4 === undefined ? 1 : _this$props$scale4;

        if (scale === 1) return true; // if scale not exists
        var deltaX = position.deltaX,
            deltaY = position.deltaY;

        var temp = { x: _this.childrenMap[key].x + deltaX / scale, y: _this.childrenMap[key].y + deltaY / scale };
        if (key) _this.childrenMap[key] = Object.assign({}, _this.childrenMap[key], temp);
        setTimeout(function () {
          // prevent draggable setState influence
          _this.setState({}); // force update when drag
        }, 0);
      };
    }, _this.onLayoutChange = function () {
      var onLayoutChange = _this.props.onLayoutChange;

      if (onLayoutChange) onLayoutChange(transMapToLayout(_this.childrenMap));
    }, _this.setParentNode = function () {
      var parentNode = _this.state.parentNode;

      if (!parentNode) _this.setState({ parentNode: ReactDom.findDOMNode(_this) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DragResizeContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var layout = this.props.layout;

      this.childrenMap = transLayoutToMap(layout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.childrenMap = transLayoutToMap(nextProps.layout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          dragProps = _props.dragProps,
          resizeProps = _props.resizeProps,
          layout = _props.layout,
          onLayoutChange = _props.onLayoutChange,
          scale = _props.scale,
          other = _objectWithoutProperties(_props, ['children', 'dragProps', 'resizeProps', 'layout', 'onLayoutChange', 'scale']);

      var parentNode = this.state.parentNode;

      var defaultProps = {
        parentNode: parentNode
      };
      var tempChildren = children instanceof Array ? children : [children];
      return React.createElement(
        'div',
        _extends({}, other, { style: contianerStyle, onMouseEnter: this.setParentNode, onTouchStart: this.setParentNode }),
        tempChildren.map(function (single) {
          var key = single.key;
          if (!_this2.childrenMap[key] && key) _this2.childrenMap[key] = defaultChildProps;
          return React.createElement(
            _dragResize2.default,
            _extends({
              key: key
            }, defaultProps, {
              resizeProps: Object.assign({}, resizeProps, {
                onResizeStop: _this2.onResizeStop(key),
                onResizeStart: _this2.onResizeStart(key),
                onResize: _this2.onResize(key)
              }),
              dragProps: Object.assign({}, dragProps, { onStop: _this2.onDragStop(key), onDrag: _this2.onDrag(key) }),
              childMap: _this2.childrenMap[key]
            }),
            single
          );
        })
      );
    }
  }]);

  return DragResizeContainer;
}(React.Component);

exports.default = DragResizeContainer;


var contianerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

var transLayoutToMap = function transLayoutToMap() {
  var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var childrenMap = {};
  layout.forEach(function (_ref7) {
    var key = _ref7.key,
        other = _objectWithoutProperties(_ref7, ['key']);

    if (key) childrenMap[key] = other;
  });
  return childrenMap;
};

var transMapToLayout = function transMapToLayout() {
  var childrenMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(childrenMap).map(function (key) {
    return _extends({ key: key }, defaultChildProps, childrenMap[key]);
  });
};

var defaultChildProps = { x: 0, y: 0, width: 200, height: 100, zIndex: 1 };

var getResizePositionTemp = function getResizePositionTemp(_ref8) {
  var currentChildMap = _ref8.currentChildMap,
      direction = _ref8.direction,
      delta = _ref8.delta,
      scale = _ref8.scale;

  var temp = {};
  var distanceW = delta.width / scale;
  var distanceH = delta.height / scale;
  switch (direction) {
    case 'bottom':
    case 'right':
    case 'bottomRight':
      temp.width = currentChildMap.width + distanceW;
      temp.height = currentChildMap.height + distanceH;
      break;
    case 'top':
    case 'left':
    case 'topLeft':
      temp.x = currentChildMap.x - distanceW;
      temp.y = currentChildMap.y - distanceH;
      if (temp.y < 0) temp.y = 0;
      if (temp.y !== 0) temp.height = currentChildMap.height + distanceH;
      if (temp.x < 0) temp.x = 0;
      if (temp.x !== 0) temp.width = currentChildMap.width + distanceW;
      break;
    case 'topRight':
      temp.y = currentChildMap.y - distanceH;
      temp.width = currentChildMap.width + distanceW;
      if (temp.y < 0) temp.y = 0;
      if (temp.y !== 0) temp.height = currentChildMap.height + distanceH;
      break;
    case 'bottomLeft':
      temp.x = currentChildMap.x - distanceW;
      temp.height = currentChildMap.height + distanceH;
      if (temp.x < 0) temp.x = 0;
      if (temp.x !== 0) temp.width = currentChildMap.width + distanceW;
      break;
    default:
  }
  return temp;
};