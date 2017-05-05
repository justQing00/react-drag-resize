# react-drag-resize
react component drag and resize

### How to use

    import DragResizeContainer from 'react-drag-resize';

    <DragResizeContainer>
      {list.map((single) => {
        return <YourComp key={single.key}/>
      })}
    </DragResizeContainer>

    <DragResizeContainer>
      <OneComp />
    </DragResizeContainer>

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
* resize can not overflow boundary
* support touchEvent
* support other container
* save to localstorage
* container width change
* every single child z-index control

### Changelog
##### 0.0.1

* base drag and resize

##### 0.0.2

* children drag and resize can not influence each other
* can not drag when resize
* can just use container not every DragResize component
