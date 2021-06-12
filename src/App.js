import { useState } from 'react'
import styled from 'styled-components'
import Layout from './Layout';

const StyledApp = styled.div`
  color: white;
  padding: 20px;

  ul {
    display: flex;
    list-style: none;

    li {
      img {
        width: 160px;
        height: 90px;
        object-fit: cover;
      }
    }
  }
`

function App() {
  const [imgFiles, setImgFiles] = useState([])

  function onChange(event) {
    let { files } = event.target

    if (FileReader && files && files.length) {
      for (const file of files) {
        let reader = new FileReader()
        reader.onload = () => {
          setImgFiles(prevImgs => [...prevImgs, reader.result])
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <StyledApp>
      <label htmlFor='img'>Upload an image</label>
      <input type="file" name='img' acccept='image/*' multiple {...{onChange}} />

      {/* <ul>
        {imgFiles.map(imgFile => <li><img src={imgFile}/></li>)}
      </ul> */}
      
      <Layout {...{imgFiles, setImgFiles}} className='layout' rowHeight={100} cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} onLayoutChange={() => {}}/>
    </StyledApp>
  )
}

export default App;
