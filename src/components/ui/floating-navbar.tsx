import { useState, useEffect, memo } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  link: string
  icon?: React.ReactNode
}

interface FloatingNavProps {
  navItems: NavItem[]
  className?: string
}

export const FloatingNav = memo(({ navItems, className }: FloatingNavProps) => {
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setIsFloating(currentScrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (sectionName: string) => {
    // Convert name back to the actual data-name attribute
    const targetSection = sectionName.toLowerCase()
    const element = document.querySelector(`section[data-name="${targetSection}"]`)
    
    if (element) {
      const offset = 80 // Account for floating navbar height
      const elementTop = (element as HTMLElement).offsetTop - offset
      
      window.scrollTo({
        top: Math.max(0, elementTop),
        behavior: 'smooth'
      })
    } else {
      console.error(`FloatingNav: Section with data-name="${targetSection}" not found!`)
      // Log all available sections for debugging
      const allSections = document.querySelectorAll('section')
      console.log('FloatingNav: Available sections:', Array.from(allSections).map(s => ({
        name: s.getAttribute('data-name'),
        id: s.getAttribute('id')
      })))
    }
  }

  return (
    <div
      className={cn(
        "navbar-container flex w-full items-center justify-center z-[5000] transition-all duration-300 ease-out fixed",
        isFloating ? "top-4 left-0 right-0" : "top-0 left-0 right-0",
        className
      )}
    >
      <div
        className={cn(
          "navbar-backdrop flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden",
          isFloating ? 
            "max-w-fit rounded-full px-12 py-3 space-x-8" :
            "w-full px-16 py-2 space-x-10"
        )}
        style={{
          background: isFloating ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.05)',
          backdropFilter: isFloating ? 'blur(10px)' : 'blur(20px)',
          WebkitBackdropFilter: isFloating ? 'blur(10px)' : 'blur(20px)',
          border: isFloating ? '1px solid rgb(16, 185, 129)' : 'none',
          borderRadius: isFloating ? '50px' : '0px',
          boxShadow: isFloating ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px rgba(16, 185, 129, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {navItems.map((navItem, idx) => (
          <button
            key={`link=${idx}`}
            onClick={() => handleClick(navItem.name)}
            className={cn(
              "navbar-item relative items-center flex space-x-1 transition-colors duration-200",
              isFloating ? 
                "text-white hover:text-emerald-400 px-4 py-2" :
                "text-white hover:text-emerald-400 text-xl font-medium px-6 py-2"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className={cn(
              "hidden sm:block transition-colors duration-200",
              isFloating ? "text-base font-medium" : "text-xl font-semibold"
            )}>
              {navItem.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
})

FloatingNav.displayName = 'FloatingNav'
