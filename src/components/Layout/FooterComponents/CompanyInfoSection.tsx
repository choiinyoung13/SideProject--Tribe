import { FOOTER_CONSTANTS } from '@/constants/layoutConstants'

export default function CompanyInfoSection() {
  return (
    <div className="leading-[26px]">
      <div className="font-[300]">
        {FOOTER_CONSTANTS.COMPANY_INFO.NAME} | 대표{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.REPRESENTATIVE} | 사업자 등록번호{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.BUSINESS_NUMBER} | 사업자정보 확인 |{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.ADDRESS} | 기업공시 | 통신판매신고번호{' '}
        {FOOTER_CONSTANTS.COMPANY_INFO.REPORT_NUMBER}
      </div>
      <div className="flex">
        이용약관 <div className="w-[10px]" /> 개인정보 처리 방침
      </div>
    </div>
  )
}
