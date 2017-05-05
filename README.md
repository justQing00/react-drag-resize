# react-drag-resize
react component drag and resize

### How to use

    import DragResizeContainer, { DragResize } from 'react-drag-resize';

    <DragResizeContainer>
      {list.map((single) => {
        return <YourComp key={single.key}/>
      })}
    </DragResizeContainer>

    <DragResizeContainer>
      <OneComp />    // use key if need to save it
    </DragResizeContainer>

    <div style={{width: '500px' height: '500px', position: 'relative' }}>
      <DragResize><OneComp /></DragResize>
    </div>

### DragResizeContainer Props
    layout  // all children size and position,  demo: [{ key: 1, width: 100, height: 1000, x: 0, y: 0 } ]

    onLayoutChange // callback layout

    dragProps // same to react-draggable props

    resizeProps // same to react-resizable-box props

### DragResize Props

    dragProps // same to react-draggable props

    resizeProps // same to react-resizable-box props

### Base Packages
[react-resizable-box](https://github.com/bokuweb/react-resizable-box)

[react-draggable](https://github.com/mzabriskie/react-draggable)

### Inspiration From

In a project I have to make React compoments dragable and resizable, and I found [react-rnd](https://github.com/bokuweb/react-rnd). But it has some bugs about muti compoments drag and show even when it's latest version(v5.0.3).
So I refactor one, base on Base Packages.

### CheckList
* every single child z-index control

### Changelog
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
