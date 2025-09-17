import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { DesktopFooterProps } from '../../../types/FooterTypes'
import { FOOTER_CONSTANTS } from '../../../constants/layoutConstants'

export default function DesktopFooter({ isNoFooterSection }: DesktopFooterProps) {
  return (
    <FooterContainer isNoFooterSection={isNoFooterSection}>
      <TitleContainer>
        <Title>TRIBE</Title>
        <SubTitle>NO REASON FOR FLOWERS</SubTitle>
      </TitleContainer>

      <CustomerCenterInfo>
        <CustomerCenterLeft>
          <CustomerCenterButton>
            고객센터 <MdKeyboardArrowRight />
          </CustomerCenterButton>
          <CustomerCenterText>
            <Text1>고객센터 {FOOTER_CONSTANTS.CUSTOMER_SERVICE.PHONE}</Text1>
            <Text2>{FOOTER_CONSTANTS.CUSTOMER_SERVICE.HOURS}</Text2>
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
          {FOOTER_CONSTANTS.COMPANY_INFO.NAME} | 대표 {FOOTER_CONSTANTS.COMPANY_INFO.REPRESENTATIVE} | 
          사업자 등록번호 {FOOTER_CONSTANTS.COMPANY_INFO.BUSINESS_NUMBER} | 
          사업자정보 확인 | {FOOTER_CONSTANTS.COMPANY_INFO.ADDRESS} | 기업공시 | 
          통신판매신고번호 {FOOTER_CONSTANTS.COMPANY_INFO.REPORT_NUMBER}
        </CompanyInfoLeft>
        <CompanyInfoRight>
          이용약관
          <Space></Space>
          개인정보 처리 방침
        </CompanyInfoRight>
      </CompanyInfo>

      <OtherInfo>㈜ TRIBE. Inc. All rights reserved.</OtherInfo>
    </FooterContainer>
  )
}

const FooterContainer = styled.div<{ isNoFooterSection: boolean }>`
  width: 100%;
  display: ${props => (props.isNoFooterSection ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: rgba(30, 30, 30, 1);
  padding: 70px 50px;
  color: rgba(210, 210, 210, 1);
`

const TitleContainer = styled.div`
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
