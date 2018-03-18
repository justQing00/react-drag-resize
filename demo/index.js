import DragResizeContainer from 'react-drag-resize';
import './index.scss'

const layout = [{ x: 0, y: 0, width: 200, height: 100, zIndex: 1 }]

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
    <div key={single.key} className='child-container size-auto border'>测试文案</div>
  );
})}
</DragResizeContainer>

const canResizable = (isResize) => {
    return { top: isResize, right: isResize, bottom: isResize, left: isResize, topRight: isResize, bottomRight: isResize, bottomLeft: isResize, topLeft: isResize };
};