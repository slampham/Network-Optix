import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const StyledResponsiveGridLayout = styled(ResponsiveReactGridLayout)`
  div {
    color: black;
    background-color: lightgray;

    display: flex;
    justify-content: center;
    align-items: center;

    .remove {
      position: absolute;
      right: 2px;
      top: 0;
      cursor: pointer;
    }
  }
`

function Layout(props) {
  const [items, setItems] = useState([])
  const [newCounter, setNewCounter] = useState(0)
  const [cols, setCols] = useState(null)

  function createElement(el) {
    return (
      <div key={el.i} data-grid={el}>
        <span className="text">{el.i}</span>
        <span className="remove" onClick={() => onRemoveItem(el.i)}>x</span>
      </div>
    );
  }

  function onRemoveItem(i) {
    setItems(prevItems => _.reject(prevItems, { i }))
  }

  function onAddItem() {
    setItems(prevItems => prevItems.concat({ // Add a new item. It must have a unique key!
      i: "n" + newCounter,
      x: (prevItems.length * 2) % (cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2,
    }))
    setNewCounter(prevCount => prevCount + 1)
  }

  function onBreakpointChange(breakpoint, cols) {
    setCols(cols)
  }

  return (
    <div>
      <button onClick={onAddItem}>Add Item</button>
      <StyledResponsiveGridLayout {...{onBreakpointChange}} {...props} >
        {items.map(item => createElement(item))}
      </StyledResponsiveGridLayout>
    </div>
  )
}

export default Layout