import styled from 'styled-components'
import { FOOTER_CONSTANTS } from '../../../constants/layoutConstants'

export default function CompanyInfoSection() {
  return (
    <CompanyInfoContainer>
      <CompanyInfoLeft>
        {FOOTER_CONSTANTS.COMPANY_INFO.NAME} | 대표{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.REPRESENTATIVE} | 사업자 등록번호{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.BUSINESS_NUMBER} | 사업자정보 확인 |{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.ADDRESS} | 기업공시 | 통신판매신고번호{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.REPORT_NUMBER}
      </CompanyInfoLeft>
      <CompanyInfoRight>
        이용약관
        <Space></Space>
        개인정보 처리 방침
      </CompanyInfoRight>
    </CompanyInfoContainer>
  )
}

const CompanyInfoContainer = styled.div`
  line-height: 26px;
`

const CompanyInfoLeft = styled.div`
  font-weight: 300;
`

const CompanyInfoRight = styled.div`
  display: flex;
`

const Space = styled.div`
  width: 10px;
`
