import styled from 'styled-components'
import Layout from './Layout';

const StyledApp = styled.div`
  color: white;
  padding: 20px;
`

function App() {
  return (
    <StyledApp>
      <Layout className='layout' rowHeight={100} cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} />
    </StyledApp>
  )
}

export default App;
