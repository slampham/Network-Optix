import { useEffect, useState } from "react";
import styled from 'styled-components'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const StyledResponsiveGridLayout = styled(ResponsiveGridLayout)`
  div {
    color: black;
    background-color: lightgray;
  }
`

function generateLayout() {
  return _.map(_.range(0, 25), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
    };
  });
}

function onDrop(_, layoutItem, _event) {
  alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`)
}

function Layout(props) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [mounted, setMounted] = useState(false)
  const [layouts, setLayouts] = useState({ lg: generateLayout() })

  useEffect(() => setMounted(true), [])

  function generateDOM() {
    return _.map(layouts.lg, (l, i) => <div key={i}><span className="text">{i}</span></div>)
  }

  return (
    <div>
      <div> Current Breakpoint: {currentBreakpoint} ({props.cols[currentBreakpoint]} columns)</div>

      <div className="droppable-element" draggable={true} unselectable="on" onDragStart={e => e.dataTransfer.setData("text/plain", "")}>
        Droppable Element (Drag me!)
      </div>

      <StyledResponsiveGridLayout
        {...props}
        layouts={layouts}
        onBreakpointChange={breakpoint => setCurrentBreakpoint(breakpoint)}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType='vertical'
        preventCollision={false}
        isDroppable={true}
      >
        {generateDOM()}
      </StyledResponsiveGridLayout>
    </div>
  );
}

export default Layout