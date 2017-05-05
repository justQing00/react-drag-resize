import * as React from 'react';
import * as ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';

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

  componentDidMount() {
    const { sizeMap, positionMap } = this.props;
    this.sizeMap = sizeMap || {};
    this.positionMap = positionMap || {};
  }

  onResizeStop = (key) => {
    return (e, direction, refToElement, delta) => {
      const { onResizeStop } = this.props.resizeProps || {};
      if (onResizeStop) onResizeStop(e, direction, refToElement, delta);
      const temp = { width: refToElement.clientWidth, height: refToElement.clientHeight };
      if (key) this.sizeMap[key] = temp;
      this.onLayoutChange();
    };
  }

  onDragStop = (key) => {
    return (e, position) => {
      const { onStop } = this.props.dragProps || {};
      if (onStop) onStop();
      const temp = { x: position.x, y: position.y };
      if (key) this.positionMap[key] = temp;
      this.onLayoutChange();
    };
  }

  onLayoutChange = () => {
    const { onLayoutChange } = this.props;
    if (onLayoutChange) onLayoutChange({ sizeMap: this.sizeMap, positionMap: this.positionMap });
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
          return (
            <DragResize
              key={key}
              {...defaultProps}
              resizeProps={Object.assign({}, resizeProps, { onResizeStop: this.onResizeStop(key), ...this.sizeMap[key] })}
              dragProps={Object.assign({}, dragProps, { onStop: this.onDragStop(key), position: this.positionMap[key] })}
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
