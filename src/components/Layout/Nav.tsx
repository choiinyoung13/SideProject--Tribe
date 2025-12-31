'use client'

import { FaBars } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import tribe_logo from '@/assets/images/logo/logo-tribe.png'
import AppInstallBanner from './NavComponents/AppInstallBanner'
import NavLinks from './NavComponents/NavLinks'
import DesktopMenu from './NavComponents/DesktopMenu'
import MobileMenu from './NavComponents/MobileMenu'
import { assetSrc } from '@/shared/lib/asset'
import { useEffect, useState } from 'react'
import { LAYOUT_CONSTANTS } from '@/constants/layoutConstants'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  // 화면 크기 변경 감지 및 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > LAYOUT_CONSTANTS.BREAKPOINTS.DESKTOP) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 반응형 메뉴가 열릴 때 body의 overflow를 hidden으로 설정
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  const toggleMenu = (state: boolean) => {
    setMenuOpen(state)
  }

  return (
    <>
      <AppInstallBanner menuOpen={menuOpen} />
      <nav
        className={[
          'absolute top-0 z-[102] w-full h-[100px] px-[60px] py-[15px] flex items-center justify-between',
          'max-[1024px]:h-[90px] max-[1024px]:px-[60px] max-[1024px]:py-[40px]',
          'max-[768px]:h-[74px] max-[768px]:px-[34px] max-[768px]:py-0',
          menuOpen ? 'max-[600px]:top-[10px]' : 'max-[600px]:top-[52px]',
          'max-[600px]:px-[26px] max-[600px]:py-0 max-[600px]:h-[60px]',
          'rgba(0,0,0,0)',
        ].join(' ')}
      >
        <div className="flex items-center max-[600px]:items-start">
          <div className="w-[15px] h-[15px]">
            <img
              className="w-full h-full"
              src={assetSrc(tribe_logo)}
              alt="tribe logo"
            />
          </div>
          <NavLinks />
        </div>

        <DesktopMenu />

        <div
          className="hidden cursor-pointer z-[9999] max-[1000px]:flex items-center text-[1.4rem]"
          onClick={() => toggleMenu(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <FaBars />}
        </div>

        <MobileMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </nav>
    </>
  )
}
