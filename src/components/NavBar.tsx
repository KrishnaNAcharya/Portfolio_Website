import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { CustomIcons } from './ui/custom-icons'
import gsap from 'gsap'
import { FloatingNav } from './ui/floating-navbar'
import { NavBarProps } from '@/lib/types'

const NavBar = memo(function NavBar({ loading }: NavBarProps) {
  const [nav, setNav] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const linksRef = useRef<(HTMLLIElement | null)[]>([])
  const navbarRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)
  
  const links = useMemo(() => [
    { id: 1, link: 'home', icon: <CustomIcons.Home /> },
    { id: 2, link: 'education', icon: <CustomIcons.Education /> },
    { id: 3, link: 'experience', icon: <CustomIcons.Experience /> },
    { id: 4, link: 'projects', icon: <CustomIcons.Projects /> },
    { id: 5, link: 'achievements', icon: <CustomIcons.Achievements /> },
    { id: 6, link: 'certifications', icon: <CustomIcons.Certificates /> },
    { id: 7, link: 'skills', icon: <CustomIcons.Skills /> },
    { id: 8, link: 'contact', icon: <CustomIcons.Contact /> }
  ], [])

  const navItems = useMemo(() => 
    links.map(({ link, icon }) => ({
      name: link.charAt(0).toUpperCase() + link.slice(1),
      link: `#${link}`,
      icon
    })), 
    [links]
  )

  const handleClick = useCallback((targetSection: string) => {
    const element = document.querySelector(`section[data-name="${targetSection}"]`)
    if (element) {
      const offset = 0
      const elementTop = (element as HTMLElement).offsetTop - offset
      
      window.scrollTo({
        top: Math.max(0, elementTop),
        behavior: 'smooth'
      })
    }
  }, [])

  const handleClose = useCallback(() => {
    if (nav && !isClosing) {
      setIsClosing(true)
    }
  }, [nav, isClosing])

  const handleNavToggle = useCallback(() => {
    if (nav) {
      handleClose()
    } else {
      setNav(true)
    }
  }, [nav, handleClose])

  const handleLinkClick = useCallback((link: string) => {
    handleClick(link)
    handleClose()
  }, [handleClick, handleClose])

  useEffect(() => {
    if (!loading && navbarRef.current) {
      const tl = gsap.timeline()
      
      tl.fromTo(navbarRef.current, 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      )
      
      if (linksRef.current.length > 0) {
        tl.fromTo(linksRef.current.filter(Boolean),
          { opacity: 0 },
          { opacity: 1, duration: 0.2, stagger: 0.05, ease: "power2.out" },
          "-=0.1"
        )
      }
    }
  }, [loading])

  useEffect(() => {
    if (sidebarRef.current) {
      if (nav && !isClosing) {
        gsap.fromTo(sidebarRef.current, 
          { x: -176, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.15, ease: "power2.out" }
        )
        
        if (linksRef.current.length > 0) {
          gsap.fromTo(linksRef.current.filter(Boolean),
            { x: -30, opacity: 0 },
            { 
              x: 0, 
              opacity: 1, 
              duration: 0.1, 
              stagger: 0.02, 
              delay: 0.03, 
              ease: "power2.out" 
            }
          )
        }
      } else if (isClosing) {
        gsap.to(linksRef.current.filter(Boolean), {
          x: -30,
          opacity: 0,
          duration: 0.08,
          stagger: 0.015,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(sidebarRef.current, {
              x: -176,
              opacity: 0,
              duration: 0.1,
              ease: "power2.in",
              onComplete: () => {
                setNav(false)
                setIsClosing(false)
              }
            })
          }
        })
      }
    }
  }, [nav, isClosing])

  if (loading) {
    return (
      <div className="hidden md:block">
        <div className="flex w-full items-center justify-center relative top-0 z-[5000]">
          <div 
            className="flex items-center justify-center w-full px-12 py-1 space-x-8"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            {links.map(({ id, link }) => (
              <div key={id} className="text-white text-xl font-medium px-4 py-1 opacity-50">
                {link}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop navbar - starts at top, transforms to floating */}
      <div className="hidden md:block">
        <FloatingNav navItems={navItems} />
      </div>

      {/* Mobile navbar */}
      <div 
        ref={navbarRef} 
        className="flex justify-between items-center w-full h-12 md:hidden text-white fixed top-0 left-0 px-4 z-[70]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          height: '35px',
        }}
      >
        <div 
          onClick={handleNavToggle} 
          className="cursor-pointer md:hidden z-[70] relative"
        >
          {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>
      </div>

      {/* Mobile menu backdrop and sidebar */}
      {(nav || isClosing) && (
        <>
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/30" 
            onClick={handleClose}
          />
          
          <nav 
            ref={sidebarRef}
            className="md:hidden fixed left-0 w-44 z-50 rounded-r-2xl"
            onClick={e => e.stopPropagation()} 
            aria-label="Mobile navigation"
            style={{
              top: '35px',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.3) 100%)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(16, 185, 129, 0.3)',
              height: 'auto',
              border: '2px solid rgba(16, 185, 129, 0.6)',
              outline: 'none',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          >
            <div className="relative py-6 px-6">
              <ul className="flex flex-col gap-4">
                {links.map(({ id, link }, index) => (
                  <li 
                    key={id} 
                    ref={el => {linksRef.current[index] = el}}
                    onClick={() => handleLinkClick(link)}
                    className="px-2 py-2 cursor-pointer font-medium text-white hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
    </>
  )
})

NavBar.displayName = 'NavBar'

export default NavBar
