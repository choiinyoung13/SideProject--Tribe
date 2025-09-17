import { useState } from 'react'

export type FooterSection =
  | 'customerService'
  | 'companyInfo'
  | 'otherInfo'
  | 'additionalInfo'

export const useFooterToggle = () => {
  const [openSections, setOpenSections] = useState({
    customerService: false,
    companyInfo: false,
    otherInfo: false,
    additionalInfo: false,
  })

  const toggleSection = (section: FooterSection) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }))
  }

  const closeAllSections = () => {
    setOpenSections({
      customerService: false,
      companyInfo: false,
      otherInfo: false,
      additionalInfo: false,
    })
  }

  return {
    openSections,
    toggleSection,
    closeAllSections,
  }
}
