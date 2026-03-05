"use client";

import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";

/**
 * NavBar Component
 * High-end, GSD-style navigation with scroll-aware transitions.
 */
const NavBar = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (event) => {
    event.preventDefault();

    if (typeof window !== "undefined" && window.__lenis__) {
      window.__lenis__.scrollTo("#hero", {
        offset: 0,
        duration: 1.5,
      });
    } else {
      const heroEl = document.querySelector("#hero");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Menu items based on Figma design
  const leftLinks = ["Shop", "Contact"];
  const rightLinks = ["About", "Cart"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-8 md:px-16 font-['Inter'] ${
        isScrolled ? "bg-black py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-start justify-between relative h-full">
        {/* Left Links */}
        <div className="flex gap-8 md:gap-12 flex-1 pt-0">
          {leftLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <img
            src={logo}
            alt="MESS Logo"
            className={`transition-all duration-500 ease-in-out object-contain cursor-pointer ${
              isScrolled ? "h-6 invert-0 pb-1" : "h-10 md:h-12"
            }`}
            style={{
                // Ensure smoothness beyond Tailwind classes
                transformOrigin: "top center",
                filter: isScrolled ? "brightness(1.2)" : "brightness(1)",
            }}
            onClick={handleLogoClick}
          />
        </div>

        {/* Right Links */}
        <div className="flex gap-8 md:gap-12 flex-1 justify-end pt-0">
          {rightLinks.map((link) => (
            link === "Cart" ? (
              <button
                key={link}
                type="button"
                onClick={() => onCartClick?.()}
                className="text-white text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                {link}
              </button>
            ) : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                {link}
              </a>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
