import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from 'styled-components'
import GridItem from "./GridItem";

const StyledGridLayout = styled.div`
  .element:hover {
    outline: 2px solid rgb(34,78,93);

    .buttons-overlay {
      display: flex;
    }

    .react-resizable-handle {
      display: inline;
    }
  }

  label.upload {
    margin-right: 1em;
  }

  input[type='file'] { /* Hide "No file chosen" */
    color: rgba(0, 0, 0, 0)
  }
`

function isValidImgFile(fName) {
  const imgFileTypes = ['jpg', 'gif', 'bmp', 'dib', 'png', 'webp', 'tiff', 'tif', 'psd', 'raw', 'heif', 'heic', 'indd', 'jpg', 'jpe', 'jif', 'jfif', 'jfi']
  return imgFileTypes.indexOf(fName.split('.').pop()) > -1;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

function Layout(props) {
  const [imgs, setImgs] = useState([])
  const [counter, setCounter] = useState(0)  // Counter to know where to place next img at
  const [cols, setCols] = useState(null)     // Cols required to know where to place next img at

  async function onChange(event) {
    const { files } = event.target

    if (FileReader && files && files.length) {  // Concurrently read all files and then add them to GridLayout
      const promises = []

      for (let [i, file] of Object.entries(files)) {
        i = parseInt(i)

        const promise = new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            if (isValidImgFile(file.name)) {
              resolve({ // Add a new img. 
                i: "n" + (counter + i), // unique key 'i'
                x: ((imgs.length + i) * 2) % (cols || 12), // calc where to place next img
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2,
                resizeHandles: ["s", "e", "se"],
                file: reader.result,
              })
            }
            else {
              reject('Must upload valid img filetypes!')
            }
          }
          reader.readAsDataURL(file)
        })
        promises.push(promise)
      }

      try {
        const newImgs = await Promise.all(promises)
        setCounter(prevCount => prevCount + files.length)
        setImgs(prevImgs => [...prevImgs, ...newImgs])
        event.target.value = '' // Reset value because user may want to submit the same pictures again. onChange will detect "change" from nothing to the same pictures
      }
      catch(e) {
        alert(e)
      }
    }
  }

  function createElement(img) {
    return (
      <div className='element' key={img.i} data-grid={img}  >
        <GridItem {...{img, onRemoveItem}} />
      </div>
    );
  }

  function onRemoveItem(i) {
    setImgs(prevImgs => prevImgs.filter(img => img.i !== i))  // Because all imgs have unique keys 'i', you can filter one out
  }

  function onLayoutChange(_, ls) {
    saveToLS("layouts", ls)
    setLayouts(ls)
  }

  return (
    <StyledGridLayout>
      <label htmlFor='img' className='upload'>Upload image(s)</label>
      <input type="file" name='img' acccept='image/*' title=" " multiple {...{onChange}} />
      <ResponsiveReactGridLayout onBreakpointChange={(_, cols) => setCols(cols)} {...props} >
        {imgs.map(img => createElement(img))}
      </ResponsiveReactGridLayout>
    </StyledGridLayout>
  )
}

export default Layout