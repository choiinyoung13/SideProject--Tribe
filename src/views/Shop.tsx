import styled from 'styled-components'
import Banner from '../components/Banner/Banner'

export default function Shop() {
  return (
    <>
      <Banner />
      <ShopCon>
        <ShopHeader>
          <ul>
            <li>전체</li>
            <li>이벤트</li>
            <li>선물용</li>
            <li>인테리어용</li>
            <li>랭킹</li>
            <li>추천</li>
          </ul>
        </ShopHeader>
        <section></section>
        <section></section>
      </ShopCon>
    </>
  )
}

const ShopCon = styled.div`
  position: relative;
  top: 120px;
  width: 100%;
  border: 1px solid red;
  z-index: 10000;
`

const ShopHeader = styled.div`
  width: 100%;
`
