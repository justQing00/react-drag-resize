import * as React from 'react';
import * as ReactDom from 'react-dom';
import DragResize from './drag-resize';

export default class DragResizeContainer extends React.Component {
  state = {
    parentNode: null,
  }

  componentWillMount() {
    const { layout } = this.props;
    this.childrenMap = transLayoutToMap(layout);
  }

  componentWillReceiveProps(nextProps) {
    this.childrenMap = transLayoutToMap(nextProps.layout);
  }

  onResizeStop = (key) => {
    return (e, direction, refToElement, delta) => {
      const { onResizeStop } = this.props.resizeProps || {};
      if (onResizeStop) onResizeStop(e, direction, refToElement, delta);
      const { zoomScaleRate = 1 } = this.props;
      let temp = null;
      if (zoomScaleRate !== 1) { // if zoomScaleRate exists
        temp = {
          width: this.childrenMap[key].width + delta.width / zoomScaleRate, 
          height: this.childrenMap[key].height  + delta.height / zoomScaleRate
        };
      } else {
        temp = { width: refToElement.clientWidth, height: refToElement.clientHeight };
      }
      if (key) this.childrenMap[key] = Object.assign({}, this.childrenMap[key], temp);
      this.onLayoutChange();
    };
  }

  onDragStop = (key) => {
    return (e, position) => {
      const { onStop } = this.props.dragProps || {};
      const { zoomScaleRate = 1 } = this.props;
      if (onStop) onStop();
      if (zoomScaleRate !== 1) { // if zoomScaleRate exists
        this.onLayoutChange();
        return false;
      }
      const temp = { x: position.x, y: position.y };
      if (key) this.childrenMap[key] = Object.assign({}, this.childrenMap[key], temp);
      this.onLayoutChange();
      this.setState({}); // force update when drag, just reduce size change render
    };
  }

  onDrag = (key) => {
    return (e, position) => {
      const { zoomScaleRate = 1 } = this.props;
      if (zoomScaleRate === 1) return true; // if zoomScaleRate not exists
      const { lastX, lastY, deltaX, deltaY } = position;
      const temp = { x: lastX + deltaX / zoomScaleRate, y: lastY + deltaY / zoomScaleRate };
      if (key) this.childrenMap[key] = Object.assign({}, this.childrenMap[key], temp);
      this.setState({}); // force update when drag, just reduce size change render
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
    const { children, dragProps, resizeProps, layout, onLayoutChange, zoomScaleRate, ...other } = this.props;
    const { parentNode } = this.state;
    const defaultProps = {
      parentNode,
    };
    const tempChildren = children instanceof Array ? children : [children];
    return (
      <div {...other} style={contianerStyle} onMouseEnter={this.setParentNode} onTouchStart={this.setParentNode}>
        {tempChildren.map((single) => {
          const key = single.key;
          if (!this.childrenMap[key] && key) this.childrenMap[key] = defaultChildProps;
          return (
            <DragResize
              key={key}
              {...defaultProps}
              resizeProps={Object.assign({}, resizeProps, { onResizeStop: this.onResizeStop(key) })}
              dragProps={Object.assign({}, dragProps, { onStop: this.onDragStop(key), onDrag: this.onDrag(key) })}
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

const transLayoutToMap = (layout = []) => {
  const childrenMap = {};
  layout.forEach(({ key, ...other }) => {
    if(key) childrenMap[key] = other;
  });
  return childrenMap;
};

const transMapToLayout = (childrenMap = {}) => {
  return Object.keys(childrenMap).map((key) => {
    return { key, ...defaultChildProps, ...childrenMap[key] };
  });
};

const defaultChildProps = { x: 0, y: 0, width: 200, height: 100, zIndex: 1 };