import styled from 'styled-components'
import { MobileFooterProps } from '../../../types/FooterTypes'
import ToggleSection from './ToggleSection'
import CustomerServiceSection from './CustomerServiceSection'
import CompanyInfoSection from './CompanyInfoSection'

export default function MobileFooter({ isNoFooterSection, openSections, toggleSection }: MobileFooterProps) {
  return (
    <FooterContainer isNoFooterSection={isNoFooterSection}>
      <ToggleSection
        title="고객센터"
        isOpen={openSections.customerService}
        onToggle={() => toggleSection('customerService')}
      >
        <CustomerServiceSection />
      </ToggleSection>

      <ToggleSection
        title="회사 정보"
        isOpen={openSections.companyInfo}
        onToggle={() => toggleSection('companyInfo')}
      >
        <CompanyInfoSection />
      </ToggleSection>

      <ToggleSection
        title="기타 정보"
        isOpen={openSections.otherInfo}
        onToggle={() => toggleSection('otherInfo')}
      >
        <OtherInfoContainer>㈜ TRIBE. Inc. All rights reserved.</OtherInfoContainer>
      </ToggleSection>
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
  padding: 20px 20px 0 20px;
  min-width: 100%;
  color: rgba(210, 210, 210, 1);
`

const OtherInfoContainer = styled.div`
  font-size: 0.8rem;
`
