import BannerSection from '../components/shop/BannerSection'
import HeaderSection from '../components/shop/HeaderSection'
import MainSection from '../components/shop/MainSection'
import StyledWebSortModal from '../components/shop/StyledWebSortModal'
import styled from 'styled-components'

export default function Shop() {
  return (
    <>
      <BannerSection />
      <ShopCon>
        <StyledWebSortModal />
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
    top: 150px;
  }

  @media (max-width: 768px) {
    top: 0px;
  }

  @media (max-width: 600px) {
    top: 0px;
  }
`
