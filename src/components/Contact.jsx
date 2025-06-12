import { useRef, useEffect, memo, useMemo, useCallback } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = memo(function Contact() {
  const headerRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  // Memoize contact links data
  const contactLinks = useMemo(() => [
    {
      href: "https://github.com/KrishnaNAcharya",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: FaGithub,
      label: "GitHub",
      ariaLabel: "Visit my GitHub profile"
    },
    {
      href: "https://www.linkedin.com/in/krishna-n-acharya-a3136b284/",
      target: "_blank", 
      rel: "noopener noreferrer",
      icon: FaLinkedin,
      label: "LinkedIn",
      ariaLabel: "Visit my LinkedIn profile"
    },
    {
      href: "mailto:knacharyakavoor@gmail.com",
      target: "_self",
      rel: undefined,
      icon: FaEnvelope,
      label: "Email",
      ariaLabel: "Send me an email"
    },
    {
      href: "tel:+918088022968",
      target: "_self",
      rel: undefined,
      icon: FaPhoneAlt,
      label: "Phone",
      ariaLabel: "Call me"
    }
  ], []);

  // Memoize contact link rendering
  const renderContactLink = useCallback(({ href, target, rel, icon: Icon, label, ariaLabel }) => (
    <a 
      key={label}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-2"
    >
      <Icon className="text-4xl hover:text-emerald-500 transition duration-300" />
      <span className="mt-2 group-hover:text-emerald-500">{label}</span>
    </a>
  ), []);

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: null, // Will be set in useEffect
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    }
  }), []);

  useEffect(() => {
    if (!headerRef.current) return;

    const element = headerRef.current;
    const config = { ...animationConfig.to };
    config.scrollTrigger.trigger = element;

    scrollTriggerRef.current = gsap.fromTo(element, animationConfig.from, config);

    // Cleanup function to prevent memory leaks
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [animationConfig]);  return (
    <section 
      id="contact" 
      name="contact" 
      className="w-full py-4 mt-auto"
      aria-labelledby="contact-heading"
      role="region"
    >
      <div className="max-w-screen-lg w-full px-4 py-4 mx-auto">
        <header ref={headerRef} className="flex justify-center mb-4 text-center sm:text-left">
          <h2 
            id="contact-heading"
            className="text-4xl sm:text-6xl font-bold inline border-b-4 border-emerald-500 text-white"
          >
            Contact Me
          </h2>
        </header>
        <main className="flex flex-col items-center">
          <nav 
            className="flex flex-wrap justify-center gap-8 md:gap-12 pb-2"
            aria-label="Contact methods and social media links"
          >
            {contactLinks.map(renderContactLink)}
          </nav>
        </main>
      </div>
    </section>
  );
});

export default Contact;