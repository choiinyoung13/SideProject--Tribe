import { MdKeyboardArrowRight } from 'react-icons/md'
import { DesktopFooterProps } from '@/types/FooterTypes'
import { FOOTER_CONSTANTS } from '@/constants/layoutConstants'

export default function DesktopFooter({
  isNoFooterSection,
}: DesktopFooterProps) {
  if (isNoFooterSection) return null

  return (
    <div className="w-full flex flex-col justify-center items-start bg-[rgba(30,30,30,1)] px-[50px] py-[70px] text-[rgba(210,210,210,1)]">
      <div className="flex items-center">
        <div className="text-[1.2rem] font-[600]">TRIBE</div>
        <div className="text-[0.8rem] font-[600] border-l border-l-[rgba(210,210,210,1)] ml-[10px] pl-[10px]">
          NO REASON FOR FLOWERS
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-[18px]">
        <div className="flex items-center">
          <div className="flex text-[0.9rem] items-center border border-[rgba(210,210,210,1)] p-[9px]">
            고객센터 <MdKeyboardArrowRight />
          </div>
          <div className="text-[0.8rem] font-[400] ml-[12px]">
            <div className="mb-[4px]">
              고객센터 {FOOTER_CONSTANTS.CUSTOMER_SERVICE.PHONE}
            </div>
            <div>{FOOTER_CONSTANTS.CUSTOMER_SERVICE.HOURS}</div>
          </div>
        </div>
        <div className="text-[0.8rem] font-[400]">
          공지사항 | 배송정책 | 회원 멤버쉽
        </div>
      </div>

      <div className="mt-[18px] flex w-full justify-between text-[0.9rem]">
        <div className="font-[300] max-[1400px]:text-[0.8rem] max-[1200px]:text-[0.7rem]">
          {FOOTER_CONSTANTS.COMPANY_INFO.NAME} | 대표{' '}
          {FOOTER_CONSTANTS.COMPANY_INFO.REPRESENTATIVE} | 사업자 등록번호{' '}
          {FOOTER_CONSTANTS.COMPANY_INFO.BUSINESS_NUMBER} | 사업자정보 확인 |{' '}
          {FOOTER_CONSTANTS.COMPANY_INFO.ADDRESS} | 기업공시 | 통신판매신고번호{' '}
          {FOOTER_CONSTANTS.COMPANY_INFO.REPORT_NUMBER}
        </div>
        <div className="flex max-[1400px]:text-[0.8rem]">
          이용약관 <div className="w-[10px]" /> 개인정보 처리 방침
        </div>
      </div>

      <div className="mt-[18px] text-[0.7rem] font-[300]">
        ㈜ TRIBE. Inc. All rights reserved.
      </div>
    </div>
  )
}
