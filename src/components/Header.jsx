"use client";

import { useState, useEffect } from "react";
import Link from 'next/link'; // Import Link for avatar
import Image from 'next/image'; // Import Image for avatar
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar"; // Corrected import path
import tempAvatar from '@/app/profile/temp/temp.png'; // Example avatar image

// Renamed MainLayout to Header and made it the default export
export default function Header() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For auth status
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // For auth check loading

  // Effect to handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      // Make navbar visible slightly earlier or adjust as needed
      setVisible(currentScrollPos > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  // Effect to check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      console.log("Header: Token from localStorage:", token);

      if (!token) {
        console.warn("Header: No token found");
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId;
        console.log("Header: User ID:", userId);

        // Check if token is expired (if it has exp field)
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          console.warn("Header: Token expired");
          localStorage.removeItem("token"); // Remove expired token
          setIsAuthenticated(false);
        } else {
          // User is authenticated
          console.log("Header: User authenticated");
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Header: Invalid token:", err);
        localStorage.removeItem("token"); // Remove invalid token
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false); // Auth check finished
      }
    };

    checkAuth();
    // Add listener for storage changes to update auth status dynamically
    const handleStorageChange = (event) => { // Removed type annotation for broader compatibility
      if (event.key === 'token') {
        checkAuth(); // Re-check auth if token changes
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run once on mount

  // Define navigation items
  const navItems = [
    { name: "Home", link: "/" }, // Link to home page
    { name: "Features", link: "/#features" },
    { name: "About", link: "/#about" },
    { name: "Analyse", link: "/audio-fetch" }, // Example link, adjust as needed
  ];

  // Component for Login/Signup Button or Profile Avatar
  const AuthElement = () => {
    if (isLoadingAuth) {
      return <div className="h-8 w-20 bg-neutral-700 rounded animate-pulse"></div>; // Placeholder while loading
    }
    if (isAuthenticated) {
      return (
        <Link href="/profile" passHref>
          <span className="cursor-pointer"> {/* Use span for better styling control if needed */}
            <Image
              src={tempAvatar}
              alt="Profile Avatar"
              width={50} // Adjust size as needed
              height={50}
              className="rounded-full border-2 border-neutral-600 hover:border-blue-500 transition-colors"
            />
          </span>
        </Link>
      );
    } else {
      return (
        <NavbarButton href="/Authentication" variant="primary">
          Login / Signup
        </NavbarButton>
      );
    }
  };

  return (
    // Navbar container using the Navbar component
    <Navbar visible={visible}>
      {/* Desktop Navigation Body */}
      <NavBody visible={visible}>
        <NavbarLogo href="/" />
        <NavItems items={navItems} />
        {/* Conditionally render AuthElement */}
        <AuthElement />
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav visible={visible}>
        <MobileNavHeader>
          <NavbarLogo href="/" />
          {/* Toggle button for mobile menu */}
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        {/* Mobile Menu Content */}
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)} className="bg-black/80 backdrop-blur-lg">
          {/* Render NavItems specifically for mobile */}
          <NavItems items={navItems} mobile />
          {/* Conditionally render AuthElement in mobile menu */}
          <div className="w-full mt-4 flex justify-start pl-4">
             <AuthElement />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
    // Removed the main content and footer part, as Header should only be the navbar
  );
}
