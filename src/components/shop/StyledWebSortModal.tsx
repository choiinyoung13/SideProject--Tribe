import styled from 'styled-components'
import WebSortModal from '../modal/WebSortModal'

const StyledWebSortModal = styled(WebSortModal)`
  position: absolute;
  top: 60px;
  right: 120px;

  @media (max-width: 1060px) {
    top: 60px;
    right: 60px;
  }

  @media (max-width: 1024px) {
    top: 0px;
    right: 30px;
  }
`

export default StyledWebSortModal
