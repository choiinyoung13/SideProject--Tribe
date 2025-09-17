export interface NavProps {
  pantname: string
  windowwidth: number
  menuopen: boolean
}

export type PageName = 'login' | 'join' | 'about' | 'community-feature' | ''

export interface AppInstallBannerProps {
  windowwidth: number
  menuOpen: boolean
}

export interface CartButtonProps {
  cartState: boolean
}

export interface MobileMenuProps {
  menuOpen: boolean
  toggleMenu: (state: boolean) => void
}

export interface NavLinksProps {
  menuOpen: boolean
}
