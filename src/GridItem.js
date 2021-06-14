import { useRef } from 'react'
import styled from 'styled-components'
import X from './X'

const StyledGridItem = styled.div`
  height: 100%;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
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
  const overlayRef = useRef(null)

  function onMouseEnter() {
    overlayRef.current.style.display = 'flex'
  }

  function onMouseLeave() {
    overlayRef.current.style.display = 'none'
  }

  return (
    <StyledGridItem {...{onMouseEnter, onMouseLeave}}>
      <img src={img.file} alt="img"/>

      <div className='buttons-overlay' ref={overlayRef} >
        <X onClick={() => onRemoveItem(img.i)} />
      </div>
    </StyledGridItem>
  )
}

export default GridItem