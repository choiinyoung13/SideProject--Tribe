import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const noFooterSection = (path: string) => {
  return (
    path === '/' ||
    path === '/about' ||
    path === '/community-feature' ||
    path === '/login' ||
    path === '/join'
  )
}

export default function Footer() {
  const location = useLocation()
  const path = location.pathname
  const isNoFooterSection = noFooterSection(path)

  return <FooterCon isnofootersection={isNoFooterSection}></FooterCon>
}

const FooterCon = styled.div<{ isnofootersection: boolean }>`
  height: ${props => (props.isnofootersection ? '0px' : '220px')};
`
