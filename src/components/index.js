import * as React from 'react';
import * as ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import isEqual from 'lodash.isequal';

export class DragResize extends React.Component {
  state = {
    parentNode: null,
  }

  onResizeStart = (e, direction, refToElement) => {
    const { resizeProps, parentNode } = this.props;
    const { onResizeStart } = resizeProps || {};
    e.stopPropagation();
    if (!parentNode && this.state.parentNode) {
      this.setState({ parentNode: ReactDom.findDOMNode(this).parentNode });
    }
    if (onResizeStart) onResizeStart(e, direction, refToElement);
  }

  getResizeProps = () => {
    const { resizeProps = {}, parentNode } = this.props;
    return {
      ...resizeProps,
      width: resizeProps.width || 200,
      height: resizeProps.height || 100,
      minWidth: resizeProps.minWidth || 100,
      minHeight: resizeProps.minHeight || 80,
      onResizeStart: this.onResizeStart,
      bounds: resizeProps.bounds || parentNode || this.state.parentNode,
    };
  }

  getDragProps = () => {
    const { dragProps = {} } = this.props;
    return {
      ...dragProps,
      bounds: dragProps.bounds || 'parent',
      defaultPosition: dragProps.defaultPosition || { x: 0, y: 0 },
    };
  }

  render() {
    const { children } = this.props;
    return (
      <Draggable {...this.getDragProps()}>
        <div style={boxStyle}>
          <Resizable {...this.getResizeProps()}>
            {children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}

export default class DragResizeContainer extends React.Component {
  state = {
    parentNode: null,
  }

  componentWillMount() {
    const { layout } = this.props;
    this.childrenMap = transLayoutToMap(layout);
  }

  componentWillReceiveProps(nextProps) {
    const { layout } = nextProps;
    if (!isEqual(layout)) {
      this.childrenMap = transLayoutToMap(layout);
    }
  }

  onResizeStop = (key) => {
    return (e, direction, refToElement, delta) => {
      const { onResizeStop } = this.props.resizeProps || {};
      if (onResizeStop) onResizeStop(e, direction, refToElement, delta);
      const temp = { width: refToElement.clientWidth, height: refToElement.clientHeight };
      if (key) this.childrenMap[key] = Object.assign({}, this.childrenMap[key], temp);
      this.onLayoutChange();
    };
  }

  onDragStop = (key) => {
    return (e, position) => {
      const { onStop } = this.props.dragProps || {};
      if (onStop) onStop();
      const temp = { x: position.x, y: position.y };
      if (key) this.childrenMap[key] = Object.assign({}, this.childrenMap[key], temp);
      this.onLayoutChange();
    };
  }

  onLayoutChange = () => {
    const { onLayoutChange } = this.props;
    if (onLayoutChange) onLayoutChange(transMapToLayout(this.childrenMap));
  }

  setParentNode = () => {
    const { parentNode } = this.state;
    if (!parentNode) this.setState({ parentNode: ReactDom.findDOMNode(this) });
  }

  render() {
    const { children, dragProps, resizeProps } = this.props;
    const { parentNode } = this.state;
    const defaultProps = {
      parentNode,
    };
    const tempChildren = children instanceof Array ? children : [children];
    return (
      <div style={contianerStyle} onMouseEnter={this.setParentNode} onTouchStart={this.setParentNode}>
        {tempChildren.map((single) => {
          const key = single.key;
          if (!this.childrenMap[key]) this.childrenMap[key] = defaultChildProps;
          return (
            <DragResize
              key={key}
              {...defaultProps}
              resizeProps={Object.assign({}, resizeProps, { onResizeStop: this.onResizeStop(key) })}
              dragProps={Object.assign({}, dragProps, { onStop: this.onDragStop(key) })}
              childMap={this.childrenMap[key]}
            >
              {single}
            </DragResize>
          );
        })}
      </div>
    );
  }
}

const contianerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  display: 'inline-block',
  position: 'absolute',
};

const transLayoutToMap = (layout = []) => {
  const childrenMap = {};
  layout.forEach(({ key, ...other }) => {
    childrenMap[key] = other;
  });
  return childrenMap;
};

const transMapToLayout = (childrenMap = {}) => {
  return Object.keys(childrenMap).map((key) => {
    return { key, ...defaultChildProps, ...childrenMap[key] };
  });
};

const defaultChildProps = { x: 0, y: 0, width: 200, height: 100 };
