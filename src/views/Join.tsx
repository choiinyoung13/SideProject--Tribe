import styled from 'styled-components'
import useWindowWidth from '../hooks/useWindowWidth'
import { JoinForm } from '../components/Join/JoinForm'
import { JoinImageSection } from '../components/Join/JoinImageSection'

export default function Join() {
  const windowWidth = useWindowWidth()

  return (
    <JoinCon>
      <JoinForm windowWidth={windowWidth} />
      <JoinImageSection />
    </JoinCon>
  )
}

const JoinCon = styled.div`
  width: 100%;
  display: flex;
`
