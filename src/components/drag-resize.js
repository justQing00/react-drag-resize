import * as React from 'react';
import * as ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import isEqual from 'lodash.isequal';

export default class DragResize extends React.Component {
  constructor(props) {
    super(props);
    const { x, y } = this.props.childMap || {};
    this.state = {
      parentNode: null,
      position: { x: x || 0, y: y || 0 },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { childMap } = nextProps;
    if (!isEqual(childMap, this.props.childMap)) {
      this.setState({ position: { x: childMap.x, y: childMap.y } });
      this.resize.updateSize({ width: childMap.width, height: childMap.height })
    }
  }

  onResizeStart = (e, direction, refToElement) => {
    const { resizeProps, parentNode } = this.props;
    const { onResizeStart } = resizeProps || {};
    e.stopPropagation();
    if (!parentNode && !this.state.parentNode) {
      this.setState({ parentNode: ReactDom.findDOMNode(this).parentNode });
    }
    if (onResizeStart) onResizeStart(e, direction, refToElement);
  }

  getResizeProps = () => {
    const { resizeProps = {}, parentNode, childMap } = this.props;
    return {
      ...resizeProps,
      width: childMap.width || resizeProps.width || 200,
      height: childMap.height || resizeProps.height || 100,
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
      position: this.state.position,
    };
  }

  render() {
    const { children, childMap } = this.props;
    return (
      <Draggable {...this.getDragProps()}>
        <div style={Object.assign({}, boxStyle, { zIndex: childMap.zIndex })}>
          <Resizable ref={resize => this.resize = resize} {...this.getResizeProps()}>
            {children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}

const boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  display: 'inline-block',
  position: 'absolute',
};