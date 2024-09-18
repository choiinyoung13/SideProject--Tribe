import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { BiSortAlt2 } from 'react-icons/bi'
import useWindowWidth from '../../hooks/useWindowWidth'
import SortModal from './SortModal'
import { communitySortState } from '../../recoil/atoms/SortState'

export default function SortButton() {
  const windowWidth = useWindowWidth()
  const sortFilterRef = useRef<HTMLDivElement>(null)
  const sortModalRef = useRef<HTMLDivElement>(null)
  const [sortDataState] = useRecoilState(communitySortState)
  const [sortModalOpened, setSortModalOpenedState] = useState(false)

  return (
    <SortFilter
      ref={sortFilterRef}
      onClick={() => {
        setSortModalOpenedState(prev => !prev)
      }}
    >
      {windowWidth >= 768 && <SortType>{sortDataState}</SortType>}
      <SortIcon>
        <BiSortAlt2 color="rgba(80,80,80,1)" />
        {sortModalOpened && (
          <CommunitySortModal ref={sortModalRef}>
            <SortModal setSortModalOpenedState={setSortModalOpenedState} />
          </CommunitySortModal>
        )}
      </SortIcon>
    </SortFilter>
  )
}

const SortFilter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 0.9rem;
    margin-right: 2px;
  }
`

const CommunitySortModal = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  z-index: 10000;
`

const SortType = styled.span`
  display: inline-block;
  margin-bottom: 1px;
  flex-shrink: 0;
`

const SortIcon = styled.div`
  position: relative;
  font-size: 1.4rem;
`
