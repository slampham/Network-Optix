import styled from 'styled-components'
import X from './X'

const StyledGridItem = styled.div`
  height: 100%;
  width: 100%;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  .buttons-overlay {
    display: none;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 25px;
    background-color: rgba(0, 0, 0, .4);
    padding: 7px;

    svg {
      cursor: pointer;
    }
  }
`

function GridItem({img, onRemoveItem}) {
  return (
    <StyledGridItem >
      <img src={img.file} alt="grid-img"/>
      <div className='buttons-overlay'>
        <X onClick={() => onRemoveItem(img.i)} />
      </div>
    </StyledGridItem>
  )
}

export default GridItem