"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger if it's not already registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSD Style Animation Library
 * Robust, reusable, and high-performance GSAP animations.
 */

const DEFAULTS = {
  duration: 1.2,
  ease: "power4.out",
  distance: 100,
};

/**
 * Slide Up + Fade In
 */
export const slideUp = (target, delay = 0, distance = DEFAULTS.distance) => {
  return gsap.fromTo(
    target, 
    { y: distance, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: DEFAULTS.duration,
      ease: DEFAULTS.ease,
      delay,
      overwrite: "auto",
    }
  );
};

/**
 * Slide Down + Fade In
 */
export const slideDown = (target, delay = 0, distance = DEFAULTS.distance) => {
  return gsap.fromTo(
    target,
    { y: -distance, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: DEFAULTS.duration,
      ease: DEFAULTS.ease,
      delay,
      overwrite: "auto",
    }
  );
};

/**
 * Slide Left + Fade In
 */
export const slideLeft = (target, delay = 0, distance = DEFAULTS.distance) => {
  return gsap.fromTo(
    target,
    { x: distance, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: DEFAULTS.duration,
      ease: DEFAULTS.ease,
      delay,
      overwrite: "auto",
    }
  );
};

/**
 * Slide Right + Fade In
 */
export const slideRight = (target, delay = 0, distance = DEFAULTS.distance) => {
  return gsap.fromTo(
    target,
    { x: -distance, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: DEFAULTS.duration,
      ease: DEFAULTS.ease,
      delay,
      overwrite: "auto",
    }
  );
};

/**
 * Reveal on Scroll Utility
 * Wraps animations using GSAP ScrollTrigger.
 */
export const revealOnScroll = (target, animationFn, delay = 0, startPos = "top 85%") => {
  if (!target) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start: startPos,
      toggleActions: "play none none none", // Play once and stay there
      onEnter: () => animationFn(target, delay),
    }
  });
};
