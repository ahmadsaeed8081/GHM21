
import { useState } from 'react'
import logo from '../assets/logo.jpeg'
import wallet from '../assets/icons/wallet.png'
import user from '../assets/icons/user.png'
import whitepaper from '../assets/GHM21_Whitepaper.pdf'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

const navLinks = ['Home', 'Tasks', 'News', 'School', 'Whitepaper', 'FAQs']

export default function Navbar({ onProfileClick, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')

  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()

  const handleNavClick = (e, link) => {
    e.preventDefault()

    // Open Whitepaper PDF in a new tab
    if (link === 'Whitepaper') {
      window.open(whitepaper, '_blank', 'noopener,noreferrer')
      setMenuOpen(false)
      return
    }

    setActive(link)
    setMenuOpen(false)
    onNavClick?.(link)
  }

  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#000C14] px-4 sm:px-6">
      <div className="relative mx-auto flex h-[56px] w-full max-w-7xl items-center gap-2 sm:h-[68px]">

        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2 max-sm:gap-1.5">
          <img
            src={logo}
            alt="GH Marketplace"
            className="h-[38px] w-auto shrink-0 object-contain sm:h-[60px]"
          />
        </div>

        {/* Navigation */}
        <div
          className={`hidden nav:flex nav:flex-1 nav:justify-center ${
            menuOpen ? 'max-nav:!flex' : ''
          } max-nav:absolute max-nav:top-[56px] max-nav:right-0 max-nav:left-0 max-nav:z-[200] max-nav:flex-col max-nav:bg-[#0b1120] sm:max-nav:top-[68px]`}
        >

          {/* Desktop */}
          <ul className="m-0 hidden list-none items-center gap-1 rounded-full border border-white/[0.10] bg-white/[0.06] p-1.5 nav:flex">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 max-lg:px-3 max-lg:text-[13px] ${
                    active === link
                      ? 'bg-white/[0.12] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile */}
          <ul className="m-0 flex list-none flex-col nav:hidden">
            {navLinks.map((link) => (
              <li
                key={link}
                className="border-b border-white/[0.08] last:border-b-0"
              >
                <a
                  href="#"
                  className="block px-6 py-4 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.04]"
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Wallet, Profile, Menu */}
        <div className="ml-auto flex shrink-0 items-center gap-2 max-sm:gap-1.5">

          {/* Wallet */}
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-none bg-mint transition-[transform,background] duration-200 hover:scale-[1.02] active:scale-[0.98] sm:h-11 sm:w-auto sm:gap-2 sm:rounded-[10px] sm:px-5 sm:py-2.5"
            aria-label="Connect Wallet"
            onClick={() => open()}
          >
            <img
              src={wallet}
              alt=""
              className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5"
            />

            <span className="hidden text-[16px] font-medium tracking-wide text-mint-text sm:inline nav:inline max-nav:hidden">
              {!isConnected
                ? 'Connect Wallet'
                : `${address.slice(0, 4)}....${address.slice(39, 42)}`}
            </span>
          </button>

          {/* Profile */}
          {isConnected && (
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-transparent transition-[border-color] hover:border-white/50 sm:h-11 sm:w-11 sm:rounded-[10px]"
              onClick={onProfileClick}
              aria-label="Profile"
            >
              <img
                src={user}
                alt=""
                className="h-[18px] w-[18px] sm:h-5 sm:w-5"
              />
            </button>
          )}

          {/* Mobile Menu */}
          <button
            type="button"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg max-nav:flex sm:h-11 sm:w-11 sm:rounded-[10px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="flex w-[22px] flex-col justify-center gap-[4px] sm:w-6 sm:gap-[5px]">

              <span
                className={`block h-0.5 w-full rounded-sm bg-gray-300 transition-all duration-300 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />

              <span
                className={`block h-0.5 w-full rounded-sm bg-gray-300 transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`block h-0.5 w-full rounded-sm bg-gray-300 transition-all duration-300 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />

            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

