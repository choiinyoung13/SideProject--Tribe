import { useState, useEffect } from 'react'
import { LAYOUT_CONSTANTS } from '../constants/layoutConstants'

export const useMenuToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // 화면 크기 변경 감지 및 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP) {
        setMenuOpen(false) // 1000px보다 크면 메뉴를 닫음
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 반응형 메뉴가 열릴 때 body의 overflow를 hidden으로 설정
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // 컴포넌트가 unmount 될 때 스크롤을 복원
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  const toggleMenu = (state: boolean) => {
    setMenuOpen(state)
  }

  return {
    menuOpen,
    toggleMenu,
  }
}
