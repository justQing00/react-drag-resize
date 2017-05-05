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

In a project I have to make React compoments dragable and resizable, and I found [react-rnd](https://github.com/bokuweb/react-rnd). But it's have some bugs about muti compoments drag and show even when it's latest version(v5.0.3).
So I refactor one, base on Base Packages.

### CheckList
* base drag and resize (finish)
* children drag and resize can not influence each other (finish)
* can not drag when resize (finish)
* can just use container not every DragResize component (finish)
* resize can not overflow boundary
* save to localstorage
* every single child z-index control

### Changelog
##### 0.0.1

base drag and resize
