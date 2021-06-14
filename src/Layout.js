import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import GridItem from "./GridItem";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
            resolve({ // Add a new img. It must have a unique key!
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

  function createElement(img) {
    return (
      <div key={img.i} data-grid={img}  >
        <GridItem {...{img, onRemoveItem}} />
      </div>
    );
  }

  function onRemoveItem(i) {
    setImgs(prevImgs => prevImgs.filter(img => img.i !== i))
  }

  return (
    <>
      <label htmlFor='img'>Upload an image</label>
      <input type="file" name='img' acccept='image/*' multiple {...{onChange}} />
      <ResponsiveReactGridLayout onBreakpointChange={(_, cols) => setCols(cols)} {...props} >
        {imgs.map(img => createElement(img))}
      </ResponsiveReactGridLayout>
    </>
  )
}

export default Layout