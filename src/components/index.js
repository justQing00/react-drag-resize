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

  setParentNode = () => {
    const { parentNode } = this.state;
    if (!parentNode) this.setState({ parentNode: ReactDom.findDOMNode(this) });
  }

  render() {
    const { children, ...other } = this.props;
    const { parentNode } = this.state;
    return (
      <div style={contianerStyle} onMouseEnter={this.setParentNode} onTouchStart={this.setParentNode}>
        {children instanceof Array ? children.map((single) => {
          return <DragResize key={single.key} {...other} parentNode={parentNode}>{single}</DragResize>;
        }) : <DragResize {...other} parentNode={parentNode}>{children}</DragResize>}
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
