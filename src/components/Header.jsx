import { useState, useEffect } from "react";

// Simplified Header component - removing dependencies on non-existent components
export default function Header() {
  const [visible, setVisible] = useState(false);

  // Effect to handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Projects", link: "/#projects" },
    { name: "Contact", link: "/#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      visible ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-3 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-white">
          Portfolio
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-white hover:text-emerald-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button - basic implementation */}
        <button className="md:hidden text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
