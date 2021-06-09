import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from './Layout';

const StyledApp = styled.div`
  color: white;
`

function App() {
  const [imgFiles, setImgFiles] = useState([])

  function onChange(event) {
    let { files } = event.target

    if (FileReader && files && files.length) {
      let reader = new FileReader()
      reader.onload = () => {
        setImgFiles(prevImgs => [...prevImgs, reader.result])
      }
      reader.readAsDataURL(files[0]);
    }
  }

  return (
    <StyledApp>
      <label htmlFor='img'>Upload an image</label>
      <input type="file" name='img' acccept='image/*' multiple {...{onChange}} />

      {imgFiles.map(imgFile => <img src={imgFile}/>)}

      <Layout className='layout' rowHeight={30} onLayoutChange={() => {}} cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}/>
    </StyledApp>
  )
}

export default App;
