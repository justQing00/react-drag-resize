import * as React from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';

export class DragResize extends React.Component {

  onResizeStart = (e, direction, refToElement) => {
    const { onResizeStart } = this.props.resizeProps || {};
    e.stopPropagation();
    if (onResizeStart) onResizeStart(e, direction, refToElement);
  }

  getResizeProps = () => {
    const { resizeProps = {} } = this.props;
    return {
      ...resizeProps,
      width: resizeProps.width || 200,
      height: resizeProps.height || 100,
      minWidth: resizeProps.minWidth || 100,
      minHeight: resizeProps.minHeight || 80,
      onResizeStart: this.onResizeStart,
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

const DragResizeContainer = ({ children }) => {
  return (
    <div style={contianerStyle}>
      {children.map((single, index) => {
        return <DragResize key={index}>{single}</DragResize>;
      })}
    </div>
  );
};

export default DragResizeContainer;

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
