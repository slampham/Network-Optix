import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const StyledResponsiveGridLayout = styled(ResponsiveReactGridLayout)`
  img {
    width: 100%;
    height: 100%;
  }

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
  const [counter, setCounter] = useState(0)
  const [cols, setCols] = useState(null)

  function onChange(event) {
    const { files } = event.target

    if (FileReader && files && files.length) {
      const newItems = []

      for (const [i, file] of Object.entries(files)) {
        const reader = new FileReader()
        reader.onload = () => {
          newItems.push({ // Add a new item. It must have a unique key!
            i: "n" + (counter + parseInt(i)),
            x: ((items.length + newItems.length) * 2) % (cols || 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2,
            file: reader.result,
          })
        }
        reader.readAsDataURL(file)
      }

      setCounter(prevCount => prevCount + files.length)
      setItems(prevItems => [...prevItems, ...newItems])
    }
  }

  function createElement(el) {
    return (
      <div key={el.i} data-grid={el}>
        <img src={el.file} alt="img" />
        <span className="remove" onClick={() => onRemoveItem(el.i)}>x</span>
      </div>
    );
  }

  function onRemoveItem(i) {
    setItems(prevItems => prevItems.filter(item => item.i !== i))
  }

  return (
    <div>
      <label htmlFor='img'>Upload an image</label>
      <input type="file" name='img' acccept='image/*' multiple {...{onChange}} />
      <StyledResponsiveGridLayout onBreakpointChange={(breakpoint, cols) => setCols(cols)} {...props} >
        {items.map(item => createElement(item))}
      </StyledResponsiveGridLayout>
    </div>
  )
}

export default Layout