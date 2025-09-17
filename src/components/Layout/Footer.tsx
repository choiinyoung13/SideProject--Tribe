import useWindowWidth from '../../hooks/useWindowWidth'
import { useFooterVisibility } from '../../hooks/useFooterVisibility'
import { useFooterToggle } from '../../hooks/useFooterToggle'
import { LAYOUT_CONSTANTS } from '../../constants/layoutConstants'
import MobileFooter from './FooterComponents/MobileFooter'
import DesktopFooter from './FooterComponents/DesktopFooter'

export default function Footer() {
  const windowWidth = useWindowWidth()
  const { isNoFooterSection } = useFooterVisibility()
  const { openSections, toggleSection } = useFooterToggle()

  return (
    <>
      {windowWidth <= LAYOUT_CONSTANTS.BREAKPOINTS.FOOTER_BREAKPOINT ? (
        <MobileFooter
          isNoFooterSection={isNoFooterSection}
          openSections={openSections}
          toggleSection={toggleSection}
        />
      ) : (
        <DesktopFooter isNoFooterSection={isNoFooterSection} />
      )}
    </>
  )
}
