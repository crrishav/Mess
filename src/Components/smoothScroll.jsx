"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll Component
 * Global smooth scroll wrapper using Lenis.
 * High-end, momentum-based scrolling for a premium feel.
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis__ = lenis;
    }

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Optimization: disable lag smoothing for cleaner scrolls
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a brief delay
    const refreshTrigger = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Also refresh on window load for absolute accuracy
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });

    // Handle Anchor Links
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.hash && target.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          lenis.scrollTo(element, {
            offset: 0,
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      document.removeEventListener("click", handleAnchorClick);
      clearTimeout(refreshTrigger);
      window.removeEventListener("load", () => ScrollTrigger.refresh());
      if (typeof window !== "undefined" && window.__lenis__ === lenis) {
        delete window.__lenis__;
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
