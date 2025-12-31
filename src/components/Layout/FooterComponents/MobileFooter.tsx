import { MobileFooterProps } from '@/types/FooterTypes'
import ToggleSection from './ToggleSection'
import CustomerServiceSection from './CustomerServiceSection'
import CompanyInfoSection from './CompanyInfoSection'

export default function MobileFooter({
  isNoFooterSection,
  openSections,
  toggleSection,
}: MobileFooterProps) {
  if (isNoFooterSection) return null

  return (
    <div className="w-full flex flex-col justify-center items-start bg-[rgba(30,30,30,1)] px-[20px] pt-[20px] min-w-full text-[rgba(210,210,210,1)]">
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
        <div className="text-[0.8rem]">㈜ TRIBE. Inc. All rights reserved.</div>
      </ToggleSection>
    </div>
  )
}
