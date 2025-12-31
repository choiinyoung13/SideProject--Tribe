import { FOOTER_CONSTANTS } from '@/constants/layoutConstants'

export default function CustomerServiceSection() {
  return (
    <div className="leading-[28px]">
      <div className="mb-[4px]">
        고객센터 {FOOTER_CONSTANTS.CUSTOMER_SERVICE.PHONE}
      </div>
      <div>{FOOTER_CONSTANTS.CUSTOMER_SERVICE.HOURS}</div>
      <div>공지사항 | 배송정책 | 회원 멤버쉽</div>
    </div>
  )
}
