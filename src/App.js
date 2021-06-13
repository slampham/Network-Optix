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
  return (
    <StyledApp>
      <Layout className='layout' rowHeight={100} cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} onLayoutChange={() => {}}/>
    </StyledApp>
  )
}

export default App;
