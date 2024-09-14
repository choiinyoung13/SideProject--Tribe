import { useEffect } from 'react'
import BannerSection from '../components/Shop/BannerSection'
import HeaderSection from '../components/Shop/HeaderSection'
import MainSection from '../components/Shop/MainSection'
import styled from 'styled-components'

export default function Shop() {
  useEffect(() => {
    // 마운트될 때 페이지를 최상단으로 스크롤
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <BannerSection />
      <ShopCon>
        <HeaderSection />
        <MainSection />
      </ShopCon>
    </>
  )
}

const ShopCon = styled.div`
  margin-top: 115px;
  width: 100%;
  z-index: 97;

  @media (max-width: 1024px) {
    margin-top: 90px;
  }

  @media (max-width: 768px) {
    margin-top: 0px;
  }
`
