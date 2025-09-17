export interface FooterProps {
  isNoFooterSection: boolean
}

export interface MobileFooterProps {
  isNoFooterSection: boolean
  openSections: {
    customerService: boolean
    companyInfo: boolean
    otherInfo: boolean
    additionalInfo: boolean
  }
  toggleSection: (section: FooterSection) => void
}

export interface DesktopFooterProps {
  isNoFooterSection: boolean
}

export type FooterSection =
  | 'customerService'
  | 'companyInfo'
  | 'otherInfo'
  | 'additionalInfo'

export interface ToggleSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}
