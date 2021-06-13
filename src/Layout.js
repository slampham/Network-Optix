import React, { useState } from "react";
import styled from 'styled-components'
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const StyledResponsiveGridLayout = styled(ResponsiveReactGridLayout)`
  div {
    img {
      width: 100%;
      height: 100%;
    }

    .remove {
      position: absolute;
      right: 2px;
      top: 0;
      cursor: pointer;
    }
  }
`

function Layout(props) {
  const [imgs, setImgs] = useState([])
  const [counter, setCounter] = useState(0)
  const [cols, setCols] = useState(null)

  async function onChange(event) {
    const { files } = event.target

    if (FileReader && files && files.length) {
      const promises = []

      for (let [i, file] of Object.entries(files)) {
        i = parseInt(i)

        const promise = new Promise(resolve => {
          const reader = new FileReader()
          reader.onload = () => {
            resolve({ // Add a new item. It must have a unique key!
              i: "n" + (counter + i),
              x: ((imgs.length + i) * 2) % (cols || 12),
              y: Infinity, // puts it at the bottom
              w: 2,
              h: 2,
              file: reader.result,
            })
          }
          reader.readAsDataURL(file)
        })
        promises.push(promise)
      }

      const newImgs = await Promise.all(promises).catch(error => console.error(error))
      setCounter(prevCount => prevCount + files.length)
      setImgs(prevImgs => [...prevImgs, ...newImgs])
    }

    event.target.value = '' // Reset value because user may want to submit the same pictures again. onChange will detect "change" from nothing to the same pictures
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
    setImgs(prevImgs => prevImgs.filter(item => item.i !== i))
  }

  return (
    <div>
      <label htmlFor='img'>Upload an image</label>
      <input type="file" name='img' acccept='image/*' multiple {...{onChange}} />
      <StyledResponsiveGridLayout onBreakpointChange={(breakpoint, cols) => setCols(cols)} {...props} >
        {imgs.map(item => createElement(item))}
      </StyledResponsiveGridLayout>
    </div>
  )
}

export default Layout