import darkLogo from '#assets/logo-black.svg'
import whiteLogo from '#assets/logo-white.svg'

export const Logo = () => {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
  return (
    <img src={darkThemeMq.matches ? whiteLogo : darkLogo} className="h-12" />
  )
}
