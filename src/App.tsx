import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'
import Nav from './components/Layout/Nav'
import Footer from './components/Layout/Footer'
import useLocalStorageFilter from './hooks/useLocalStorageFilter'
import { useRecoilValue } from 'recoil'
import { ModileCartCalendarModalState } from './recoil/atoms/ModileCartCalendarModalState'
import { useEffect } from 'react'
import styled from 'styled-components'

function App() {
  useLocalStorageFilter()
  const isModalOpen = useRecoilValue(ModileCartCalendarModalState)

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  return (
    <BrowserRouter>
      <Container>
        <Nav />
        <Router />
        <Footer />
      </Container>
    </BrowserRouter>
  )
}

const Container = styled.div`
  min-width: 375px; /* 화면에 맞춰서 반응형으로 줄어듦 */
`

export default App
