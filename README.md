![download](https://img.shields.io/badge/download-700+/month-green.svg?longCache=true&style=plastic)
# react-drag-resize
react component drag and resize

### How to install
- `npm install --save react-drag-resize`

### How to use
- `see ./demo`
- `child must use absolute style for position confirmation. Like style class: child-container size-auto`
-  `child must have key, key suggest use string`

![demo](./demo/demo.gif)

```javascript
import DragResizeContainer from 'react-drag-resize';

const layout = [{ key: 'test', x: 0, y: 0, width: 200, height: 100, zIndex: 1 }]

<DragResizeContainer
    className='resize-container'
    resizeProps={{ 
        minWidth: 10, 
        minHeight: 10, 
        enable: canResizable(isResize) 
    }}
    onDoubleClick={clickScreen}
    layout={layout}
    dragProps={{ disabled: false }}
    onLayoutChange={onLayoutChange}
    scale={scale}
>
{layout.map((single) => {
  return (
    <div key={single.key} className='child-container size-auto border'>text test</div>
  );
})}
</DragResizeContainer>

const canResizable = (isResize) => {
    return { top: isResize, right: isResize, bottom: isResize, left: isResize, topRight: isResize, bottomRight: isResize, bottomLeft: isResize, topLeft: isResize };
};
  

```
### DragResizeContainer Props
```javascript
{
  layout,  // all children size and position,  demo: [{ key: 1, width: 100, height: 1000, x: 0, y: 0, zIndex: 1 } ]

  onLayoutChange, // callback layout

  dragProps,  // same to react-draggable props

  resizeProps,  // same to react-resizable-box props

  scale, // zoom or scale rate for component drag or resize

  onDoubleClick, // for resize-container double click
}
```

### Base Packages
[react-resizable-box](https://github.com/bokuweb/react-resizable-box)

[react-draggable](https://github.com/mzabriskie/react-draggable)

### Inspiration From

In a project I have to make React compoments dragable and resizable, and I found [react-rnd](https://github.com/bokuweb/react-rnd). But it has some bugs about muti compoments drag and show even when it's latest version(v5.0.3).
So I refactor one, base on Base Packages.

### CheckList

### Changelog
##### 0.1.4
* resize to all direction

##### 0.1.2
* dragging scale fix in react-draggable

##### 0.1.1
* add support for resizing components inside scaled or zoom Div

##### 0.1.0
* onLayoutChange waring fix

##### 0.0.9
* fix resize width bug

##### 0.0.8
* key not empty, fix position bug

##### 0.0.7
* fix layout warning

##### 0.0.6
* can add other props for container

##### 0.0.5
* every single child z-index control

##### 0.0.4
* a way can export and restore all children size and postion

##### 0.0.3
* resize can not overflow boundary
* support touchEvent
* support other container

##### 0.0.2
* children drag and resize can not influence each other
* can not drag when resize
* can just use container not every DragResize component

##### 0.0.1
* base drag and resize
