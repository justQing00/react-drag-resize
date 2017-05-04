import * as React from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';

export default class DragResize extends React.Component {

  getDragProps = () => {
    return {
      bounds: 'parent',
      defaultPosition: { x: 0, y: 0 },
      ...this.props.dragProps,
    };
  }

  getResizeProps = () => {
    return {
      width: 200,
      height: 100,
      minWidth: 100,
      minHeight: 80,
      ...this.props.resizeProps,
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

const boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  display: 'inline-block',
  float: 'left', //  浮动，防止size大小变化导致互相影响
};
