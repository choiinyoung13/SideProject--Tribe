import BannerSection from '../components/Shop/BannerSection'
import HeaderSection from '../components/Shop/HeaderSection'
import MainSection from '../components/Shop/MainSection'
import styled from 'styled-components'

export default function Shop() {
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
  position: relative;
  top: 115px;
  width: 100%;
  z-index: 97;

  @media (max-width: 1024px) {
    top: 90px;
  }

  @media (max-width: 768px) {
    top: 0px;
  }

  @media (max-width: 600px) {
    top: 0px;
  }
`
