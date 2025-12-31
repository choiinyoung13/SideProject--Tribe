'use client'

import { FOOTER_CONSTANTS } from '@/constants/layoutConstants'
import MobileFooter from './FooterComponents/MobileFooter'
import DesktopFooter from './FooterComponents/DesktopFooter'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type FooterSection =
  | 'customerService'
  | 'companyInfo'
  | 'otherInfo'
  | 'additionalInfo'

export default function Footer() {
  const pathname = usePathname()
  const path = pathname ?? '/'

  // 모든 Hooks는 early return 전에 호출해야 함
  const [openSections, setOpenSections] = useState({
    customerService: false,
    companyInfo: false,
    otherInfo: false,
    additionalInfo: false,
  })

  if (path.includes('community')) {
    return null
  }

  const isNoFooterSection = (
    FOOTER_CONSTANTS.NO_FOOTER_PATHS as readonly string[]
  ).includes(path)

  const toggleSection = (section: FooterSection) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }))
  }

  return (
    <>
      <div className="min-[1025px]:hidden">
        <MobileFooter
          isNoFooterSection={isNoFooterSection}
          openSections={openSections}
          toggleSection={toggleSection}
        />
      </div>
      <div className="max-[1024px]:hidden">
        <DesktopFooter isNoFooterSection={isNoFooterSection} />
      </div>
    </>
  )
}
