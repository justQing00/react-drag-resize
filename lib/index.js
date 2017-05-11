'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragResize = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDom = _interopRequireWildcard(_reactDom);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactResizableBox = require('react-resizable-box');

var _reactResizableBox2 = _interopRequireDefault(_reactResizableBox);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragResize = exports.DragResize = function (_React$Component) {
  _inherits(DragResize, _React$Component);

  function DragResize(props) {
    _classCallCheck(this, DragResize);

    var _this = _possibleConstructorReturn(this, (DragResize.__proto__ || Object.getPrototypeOf(DragResize)).call(this, props));

    _this.onResizeStart = function (e, direction, refToElement) {
      var _this$props = _this.props,
          resizeProps = _this$props.resizeProps,
          parentNode = _this$props.parentNode;

      var _ref = resizeProps || {},
          onResizeStart = _ref.onResizeStart;

      e.stopPropagation();
      if (!parentNode && !_this.state.parentNode) {
        _this.setState({ parentNode: ReactDom.findDOMNode(_this).parentNode });
      }
      if (onResizeStart) onResizeStart(e, direction, refToElement);
    };

    _this.getResizeProps = function () {
      var _this$props2 = _this.props,
          _this$props2$resizePr = _this$props2.resizeProps,
          resizeProps = _this$props2$resizePr === undefined ? {} : _this$props2$resizePr,
          parentNode = _this$props2.parentNode,
          childMap = _this$props2.childMap;

      return _extends({}, resizeProps, {
        width: childMap.width || resizeProps.width || 200,
        height: childMap.height || resizeProps.height || 100,
        minWidth: resizeProps.minWidth || 100,
        minHeight: resizeProps.minHeight || 80,
        onResizeStart: _this.onResizeStart,
        bounds: resizeProps.bounds || parentNode || _this.state.parentNode
      });
    };

    _this.getDragProps = function () {
      var _this$props$dragProps = _this.props.dragProps,
          dragProps = _this$props$dragProps === undefined ? {} : _this$props$dragProps;

      return _extends({}, dragProps, {
        bounds: dragProps.bounds || 'parent',
        defaultPosition: dragProps.defaultPosition || { x: 0, y: 0 },
        position: _this.state.position
      });
    };

    var _ref2 = _this.props.childMap || {},
        x = _ref2.x,
        y = _ref2.y;

    _this.state = {
      parentNode: null,
      position: { x: x || 0, y: y || 0 }
    };
    return _this;
  }

  _createClass(DragResize, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var childMap = nextProps.childMap;

      if (!(0, _lodash2.default)(childMap, this.props.childMap)) {
        this.setState({ position: { x: childMap.x, y: childMap.y } });
        this.resize.updateSize({ width: childMap.width, height: childMap.height });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          childMap = _props.childMap;

      return React.createElement(
        _reactDraggable2.default,
        this.getDragProps(),
        React.createElement(
          'div',
          { style: Object.assign({}, boxStyle, { zIndex: childMap.zIndex }) },
          React.createElement(
            _reactResizableBox2.default,
            _extends({ ref: function ref(resize) {
                return _this2.resize = resize;
              } }, this.getResizeProps()),
            children
          )
        )
      );
    }
  }]);

  return DragResize;
}(React.Component);

var DragResizeContainer = function (_React$Component2) {
  _inherits(DragResizeContainer, _React$Component2);

  function DragResizeContainer() {
    var _ref3;

    var _temp, _this3, _ret;

    _classCallCheck(this, DragResizeContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref3 = DragResizeContainer.__proto__ || Object.getPrototypeOf(DragResizeContainer)).call.apply(_ref3, [this].concat(args))), _this3), _this3.state = {
      parentNode: null
    }, _this3.onResizeStop = function (key) {
      return function (e, direction, refToElement, delta) {
        var _ref4 = _this3.props.resizeProps || {},
            onResizeStop = _ref4.onResizeStop;

        if (onResizeStop) onResizeStop(e, direction, refToElement, delta);
        var temp = { width: refToElement.clientWidth, height: refToElement.clientHeight };
        if (key) _this3.childrenMap[key] = Object.assign({}, _this3.childrenMap[key], temp);
        _this3.onLayoutChange();
      };
    }, _this3.onDragStop = function (key) {
      return function (e, position) {
        var _ref5 = _this3.props.dragProps || {},
            onStop = _ref5.onStop;

        if (onStop) onStop();
        var temp = { x: position.x, y: position.y };
        if (key) _this3.childrenMap[key] = Object.assign({}, _this3.childrenMap[key], temp);
        _this3.onLayoutChange();
        _this3.setState({}); // force update when drag, just reduce size change render
      };
    }, _this3.onLayoutChange = function () {
      var onLayoutChange = _this3.props.onLayoutChange;

      if (onLayoutChange) onLayoutChange(transMapToLayout(_this3.childrenMap));
    }, _this3.setParentNode = function () {
      var parentNode = _this3.state.parentNode;

      if (!parentNode) _this3.setState({ parentNode: ReactDom.findDOMNode(_this3) });
    }, _temp), _possibleConstructorReturn(_this3, _ret);
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
      var _this4 = this;

      var _props2 = this.props,
          children = _props2.children,
          dragProps = _props2.dragProps,
          resizeProps = _props2.resizeProps,
          layout = _props2.layout,
          other = _objectWithoutProperties(_props2, ['children', 'dragProps', 'resizeProps', 'layout']);

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
          if (!_this4.childrenMap[key] && key) _this4.childrenMap[key] = defaultChildProps;
          return React.createElement(
            DragResize,
            _extends({
              key: key
            }, defaultProps, {
              resizeProps: Object.assign({}, resizeProps, { onResizeStop: _this4.onResizeStop(key) }),
              dragProps: Object.assign({}, dragProps, { onStop: _this4.onDragStop(key) }),
              childMap: _this4.childrenMap[key]
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

var boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  display: 'inline-block',
  position: 'absolute'
};

var transLayoutToMap = function transLayoutToMap() {
  var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var childrenMap = {};
  layout.forEach(function (_ref6) {
    var key = _ref6.key,
        other = _objectWithoutProperties(_ref6, ['key']);

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