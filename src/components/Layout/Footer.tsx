import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import useWindowWidth from '../../hooks/useWindowWidth'
import { useState } from 'react'

const noFooterSection = (path: string) => {
  return (
    path === '/' ||
    path === '/about' ||
    path === '/community-feature' ||
    path === '/login' ||
    236 + path === '/join'
  )
}

export default function Footer() {
  const location = useLocation()
  const path = location.pathname
  const isNoFooterSection = noFooterSection(path)
  const windowWidth = useWindowWidth()
  const [openSections, setOpenSections] = useState({
    customerService: false,
    companyInfo: false,
    otherInfo: false,
    additionalInfo: false,
  })

  type Section =
    | 'customerService'
    | 'companyInfo'
    | 'otherInfo'
    | 'additionalInfo'

  const toggleSection = (section: Section) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }))
  }

  return (
    <>
      {windowWidth <= 1024 ? (
        <FooterCon isnofootersection={isNoFooterSection}>
          <ToggleSection>
            <ToggleHeader onClick={() => toggleSection('customerService')}>
              고객센터 <MdKeyboardArrowRight />
            </ToggleHeader>
            {openSections.customerService && (
              <CustomerServiceDetails>
                <Text1>고객센터 1234-1234</Text1>
                <Text2>
                  AM 10:00 - PM: 18:00 점심시간 13:00 - 14:00 (주말 & 공휴일
                  휴무)
                </Text2>
                <CustomerCenterOtherDesc>
                  공지사항 | 배송정책 | 회원 멤버쉽
                </CustomerCenterOtherDesc>
              </CustomerServiceDetails>
            )}
          </ToggleSection>
          <ToggleSection>
            <ToggleHeader onClick={() => toggleSection('companyInfo')}>
              회사 정보 <MdKeyboardArrowRight />
            </ToggleHeader>
            {openSections.companyInfo && (
              <CompanyInfoDetails>
                <CompanyInfoLeft>
                  주식회사 트리비 | 대표 ooo | 사업자 등록번호 123-45-67891 |
                  사업자정보 확인 | 서울특별시 서초구 명달로 9 방배빌딩 |
                  기업공시 | 통신판매신고번호 1234-5678
                </CompanyInfoLeft>
                <CompanyInfoRight>
                  이용약관
                  <Space></Space>
                  개인정보 처리 방침
                </CompanyInfoRight>
              </CompanyInfoDetails>
            )}
          </ToggleSection>
          <ToggleSection>
            <ToggleHeader onClick={() => toggleSection('otherInfo')}>
              기타 정보 <MdKeyboardArrowRight />
            </ToggleHeader>
            {openSections.otherInfo && (
              <OtherInfoDetails>
                ㈜ TRIBE. Inc. All rights reserved.
              </OtherInfoDetails>
            )}
          </ToggleSection>
        </FooterCon>
      ) : (
        <FooterCon isnofootersection={isNoFooterSection}>
          <TitleCon>
            <Title>TRIBE</Title>
            <SubTitle>NO REASON FOR FLOWERS</SubTitle>
          </TitleCon>
          <CustomerCenterInfo>
            <CustomerCenterLeft>
              <CustomerCenterButton>
                고객센터 <MdKeyboardArrowRight />
              </CustomerCenterButton>
              <CustomerCenterText>
                <Text1>고객센터 1234-1234</Text1>
                <Text2>
                  AM 10:00 - PM: 18:00 점심시간 13:00 - 14:00 (주말 & 공휴일
                  휴무)
                </Text2>
              </CustomerCenterText>
            </CustomerCenterLeft>
            <CustomerCenterRight>
              <CustomerCenterOtherDesc>
                공지사항 | 배송정책 | 회원 멤버쉽
              </CustomerCenterOtherDesc>
            </CustomerCenterRight>
          </CustomerCenterInfo>
          <CompanyInfo>
            <CompanyInfoLeft>
              주식회사 트리비 | 대표 ooo | 사업자 등록번호 123-45-67891 |
              사업자정보 확인 | 서울특별시 서초구 명달로 9 방배빌딩 | 기업공시 |
              통신판매신고번호 1234-5678
            </CompanyInfoLeft>
            <CompanyInfoRight>
              이용약관
              <Space></Space>
              개인정보 처리 방침
            </CompanyInfoRight>
          </CompanyInfo>
          <OtherInfo>㈜ TRIBE. Inc. All rights reserved.</OtherInfo>
        </FooterCon>
      )}
    </>
  )
}

const FooterCon = styled.div<{ isnofootersection: boolean }>`
  width: 100%;
  min-width: 1130px;
  display: ${props => (props.isnofootersection ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: rgba(30, 30, 30, 1);
  padding: 70px 50px;
  color: rgba(210, 210, 210, 1);

  @media (max-width: 1024px) {
    padding: 20px 20px 0 20px;
    min-width: 100%;
  }
`

const ToggleSection = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(210, 210, 210, 0.1);

  &:last-of-type {
    border: none;
    padding-bottom: 4px;
  }
`

const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: rgba(210, 210, 210, 1);

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
`

const CustomerServiceDetails = styled.div`
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: rgba(210, 210, 210, 1);
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 28px;
`

const CompanyInfoDetails = styled.div`
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: rgba(210, 210, 210, 1);
  line-height: 26px;
`

const OtherInfoDetails = styled.div`
  padding: 10px;
  background-color: rgba(30, 30, 30, 1);
  color: rgba(210, 210, 210, 1);
  font-size: 0.8rem;
`

const TitleCon = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`

const SubTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  border-left: 1px solid rgba(210, 210, 210, 1);
  margin-left: 10px;
  padding-left: 10px;
`

const CustomerCenterInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`

const CustomerCenterLeft = styled.div`
  display: flex;
  align-items: center;
`

const CustomerCenterRight = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
`

const CustomerCenterButton = styled.div`
  display: flex;
  font-size: 0.9rem;
  align-items: center;
  border: 1px solid rgba(210, 210, 210, 1);
  padding: 9px;
`

const CustomerCenterText = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: 12px;
`

const Text1 = styled.div`
  margin-bottom: 4px;
`

const Text2 = styled.div``

const CustomerCenterOtherDesc = styled.div``

const CompanyInfo = styled.div`
  margin-top: 18px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 0.9rem;
`

const CompanyInfoLeft = styled.div`
  font-weight: 300;

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }

  @media (max-width: 1200px) {
    font-size: 0.7rem;
  }
`

const CompanyInfoRight = styled.div`
  display: flex;

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }
`

const OtherInfo = styled.div`
  margin-top: 18px;
  font-size: 0.7rem;
  font-weight: 300;
`

const Space = styled.div`
  width: 10px;
`
