import { useLocation } from 'react-router-dom'
import { FOOTER_CONSTANTS } from '../constants/layoutConstants'

export const useFooterVisibility = () => {
  const location = useLocation()
  const path = location.pathname as any

  const isNoFooterSection = FOOTER_CONSTANTS.NO_FOOTER_PATHS.includes(path)

  return {
    isNoFooterSection,
    currentPath: path,
  }
}
