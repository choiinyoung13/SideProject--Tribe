import styled from 'styled-components'
import { FOOTER_CONSTANTS } from '../../../constants/layoutConstants'

export default function CustomerServiceSection() {
  return (
    <CustomerServiceContainer>
      <Text1>고객센터 {FOOTER_CONSTANTS.CUSTOMER_SERVICE.PHONE}</Text1>
      <Text2>{FOOTER_CONSTANTS.CUSTOMER_SERVICE.HOURS}</Text2>
      <CustomerCenterOtherDesc>
        공지사항 | 배송정책 | 회원 멤버쉽
      </CustomerCenterOtherDesc>
    </CustomerServiceContainer>
  )
}

const CustomerServiceContainer = styled.div`
  line-height: 28px;
`

const Text1 = styled.div`
  margin-bottom: 4px;
`

const Text2 = styled.div``

const CustomerCenterOtherDesc = styled.div``
