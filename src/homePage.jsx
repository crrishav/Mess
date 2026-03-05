"use client";

import React, { useEffect, useRef, useState } from "react";
import NavBar from "./Components/navBar";
import ShopNowButton from "./Components/ShopNowButton";
import AddToCartButton from "./Components/AddToCartButton";
import { slideUp, slideDown, revealOnScroll } from "./Components/animations";
import TrustedInfluencersSection from "./Components/TrustedInfluencersSection";
import Footer from "./Components/Footer";
import CartOverlay from "./Components/CartOverlay";

// Product Images
import img1 from "./assets/products/1.PNG";
import img2 from "./assets/products/2.PNG";
import img3 from "./assets/products/3.PNG";
import img4 from "./assets/products/4.PNG";
import NepalMap from "./Components/NepalMap";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * HomePage Component
 * Showcase of the MESS brand with the new robust NavBar.
 */
const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const mainRef = useRef(null);
  const section2Ref = useRef(null);
  const section2TitleRef = useRef(null);
  const productsRef = useRef([]);
  const section3Ref = useRef(null);
  const section3ContentRef = useRef(null);
  const section4Ref = useRef(null);
  const section4ContentRef = useRef(null);
  const section5Ref = useRef(null);
  const section5TitleRef = useRef(null);
  const nepalMapRef = useRef(null);
  
  // Showcase Refs
  const showcaseRef = useRef(null);
  const showcaseSlidesRef = useRef([]);

  const showcaseProducts = [
    {
      id: 1,
      name: "Sea Salt Spray",
      desc: "Get that fresh, beach-inspired look anytime with our Sea Salt Spray. Designed to add natural texture, light hold, and effortless volume, it gives your hair the same relaxed style you get after a day by the ocean. The lightweight formula enhances waves and movement without making your hair feel heavy or sticky.",
      img: img1
    },
    {
      id: 2,
      name: "Matte Clay",
      desc: "Our Matte Clay provides a strong, flexible hold with a natural, no-shine finish. Perfect for creating structured styles that stay in place all day while remaining touchable. Infused with natural minerals, it adds thickness and grit to any hair type, making it easy to sculpt and redefine your look throughout the day.",
      img: img2
    },
    {
      id: 3,
      name: "Refreshing Shampoo",
      desc: "Cleanse and revitalize your hair with our Refreshing Shampoo. Formulated with botanical extracts, it gently removes buildup while nourishing the scalp. The invigorating scent and cooling sensation leave your hair feeling fresh, light, and full of life, making it the perfect start to your daily grooming routine.",
      img: img3
    },
    {
      id: 4,
      name: "Nourishing Conditioner",
      desc: "Restore moisture and shine with our Nourishing Conditioner. Designed to detangle and soften, it deep-hydrates without weighing hair down. Natural oils and proteins strengthen the hair shaft, reducing frizz and improving manageability for a smooth, healthy-looking finish you can feel.",
      img: img4
    }
  ];

  useEffect(() => {
    // Use gsap.context for better cleanup and animation scoping
    const ctx = gsap.context(() => {
      // Initialize or clear refs to prevent stale elements in StrictMode
      showcaseSlidesRef.current = showcaseSlidesRef.current.slice(0, showcaseProducts.length);

      // 1. Section 2: Product Grid Staggered Reveal
      if (section2TitleRef.current) {
        revealOnScroll(section2TitleRef.current, slideDown, 0, "top 90%");
      }

      productsRef.current.forEach((el, index) => {
        if (el) {
          revealOnScroll(el, slideUp, 0.05 * index, "top 85%");
        }
      });

      // 2. Section 3 & 4: Content Reveal
      if (section3ContentRef.current) {
        revealOnScroll(section3ContentRef.current, slideUp, 0, "top 85%");
      }
      if (section4ContentRef.current) {
        revealOnScroll(section4ContentRef.current, slideUp, 0, "top 85%");
      }

      // 3. Section 5: Title & Map Reveal
      if (section5TitleRef.current) {
        revealOnScroll(section5TitleRef.current, slideDown, 0, "top 90%");
      }
      if (nepalMapRef.current) {
        revealOnScroll(nepalMapRef.current, slideUp, 0.2, "top 85%");
      }

      // 4. Showcase Section: Pinning and Linked Swap Animation
      if (showcaseRef.current && showcaseSlidesRef.current.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: `+=${showcaseProducts.length * 100}%`,
            pin: true,
            scrub: 1, // Smoothly scrub the timeline
            anticipatePin: 1,
          }
        });

        showcaseSlidesRef.current.forEach((slide, index) => {
          if (!slide) return;
          const img = slide.querySelector(".showcase-img");
          const text = slide.querySelector(".showcase-text");

          // Initial state: Everything hidden except first slide
          if (index === 0) {
            gsap.set([img, text], { autoAlpha: 1, y: 0 });
            gsap.set(slide, { zIndex: 20 });
          } else {
            gsap.set([img, text], { autoAlpha: 0, y: 50 });
            gsap.set(slide, { zIndex: 10 });
          }

          // Timeline for this slide
          if (index > 0) {
            // Slide in: Simultaneously fade out previous (handled by the previous slide's loop)
            // and fade in current.
            tl.to(slide, { zIndex: 20, duration: 0.1 }, ">") // Bring to front
              .to([img, text], { 
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.1, 
                ease: "power2.out" 
              }, "<");
          }

          // "Stay" time for the slide
          tl.to({}, { duration: 1 });

          // Slide out (except for the last slide)
          if (index < showcaseSlidesRef.current.length - 1) {
            tl.to([img, text], { 
              autoAlpha: 0, 
              y: -50, 
              duration: 1, 
              ease: "power2.in" 
            })
            .set(slide, { zIndex: 10 }); // Back to background
          }
        });
      }

      // Refresh ScrollTrigger after a brief delay
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, mainRef); // Scope to the main container

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  useEffect(() => {
    const lenis = typeof window !== "undefined" ? window.__lenis__ : null;
    const prevOverflow = document.body.style.overflow;

    if (isCartOpen) {
      lenis?.stop?.();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start?.();
      document.body.style.overflow = prevOverflow || "";
    }

    return () => {
      lenis?.start?.();
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isCartOpen]);

  const products = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
  ];

  return (
    <div ref={mainRef} className="bg-[#000000] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* Scroll-Aware Navbar */}
      <NavBar onCartClick={() => setIsCartOpen(true)} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Section - Completely Black and Empty */}
      <section id="hero" className="h-screen w-full bg-[#000000] relative overflow-hidden flex items-center justify-center">
        {/* Intentionally left blank as per requirements */}
      </section>

      {/* Second Section: Product Grid */}
      <section 
        ref={section2Ref}
        className="min-h-[80vh] pt-24 pb-32 px-8 md:px-32 bg-black flex flex-col items-center justify-start relative gap-y-16"
      >
        <div className="flex flex-col items-center text-center w-full mb-8">
          <h2 
            ref={section2TitleRef}
            className="text-2xl md:text-3xl font-bold uppercase tracking-tight w-full max-w-none whitespace-nowrap px-4 reveal-hidden"
          >
            High-quality hair care products
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productsRef.current[index] = el)}
              className="bg-[#111111] p-10 flex flex-col items-center justify-center aspect-[4/5] relative group overflow-hidden border border-white/5 reveal-hidden"
            >
              <img
                src={product.img}
                alt={`Product ${product.id}`}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Third Section: Pricing Design */}
      <section 
        ref={section3Ref}
        className="h-screen w-full bg-black flex items-end justify-start p-12 md:p-24 overflow-hidden relative"
      >
        <div 
          ref={section3ContentRef}
          className="max-w-xl flex flex-col items-start gap-y-4 reveal-hidden"
        >
          <div className="flex flex-col items-start">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight font-inter">
              Cheap and Reasonable Pricing
            </h3>
          </div>
          <p className="text-sm md:text-lg font-normal leading-relaxed opacity-70 font-inter">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
      </section>

      {/* Fourth Section: Proudly Made in Nepal */}
      <section 
        ref={section4Ref}
        className="h-screen w-full bg-black flex items-end justify-end p-12 md:p-24 overflow-hidden relative"
      >
        <div 
          ref={section4ContentRef}
          className="max-w-xl flex flex-col items-start gap-y-4 reveal-hidden"
        >
          <div className="flex flex-col items-start">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight font-inter">
              Proudly made in Nepal
            </h3>
          </div>
          <p className="text-sm md:text-lg font-normal leading-relaxed opacity-70 font-inter">
            Our products are proudly made in Nepal, supporting local craftsmanship, local 
            businesses, and the growing Nepali beauty industry. We focus on creating high-quality 
            hair care products that meet modern standards while staying affordable and 
            accessible for everyone.
          </p>
        </div>
      </section>

      {/* Fifth Section: Delivery Across Nepal */}
      <section 
        ref={section5Ref}
        className="min-h-screen w-full bg-black flex flex-col items-center justify-start pt-32 pb-48 relative"
      >
        <div className="flex flex-col items-center text-center w-full mb-20">
          <h2 
            ref={section5TitleRef}
            className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] w-full max-w-none whitespace-nowrap px-4 reveal-hidden"
          >
            Delivery Across Nepal
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mt-6"></div>
        </div>
        
        {/* Nepal Map Integration - Refined for premium feel */}
        <div 
          ref={nepalMapRef}
          className="w-full max-w-5xl px-12 md:px-24 reveal-hidden"
        >
          <NepalMap className="opacity-90 py-8" />
        </div>
      </section>

      {/* Pinned Showcase Section */}
      <section 
        ref={showcaseRef}
        className="h-screen w-full relative overflow-hidden"
      >
        {/* Background halves */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full bg-[#FCE7CC]"></div>
          <div className="w-1/2 h-full bg-black"></div>
        </div>

        {/* Slides Container */}
        <div className="absolute inset-0 z-10">
          {showcaseProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (showcaseSlidesRef.current[index] = el)}
              className={`
                absolute inset-0 flex flex-col md:flex-row items-center justify-center 
                px-8 md:px-32 gap-12
              `}
            >
              {/* Product Image (Left side) - Proportional scale down */}
              <div className="w-full md:w-1/2 flex justify-center showcase-img">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-1/2 md:w-[45%] object-contain max-h-[60vh]"
                />
              </div>

              {/* Product Text (Right side) - Centralized and scaled down */}
              <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center text-center gap-y-4 showcase-text z-20 selection:bg-[#FCE7CC] selection:text-black">
                <h3 className="text-xl md:text-2xl font-bold text-white font-inter uppercase tracking-widest">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base text-white/60 font-inter max-w-sm leading-relaxed">
                  {product.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <ShopNowButton className="scale-75" />
                  <AddToCartButton />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrustedInfluencersSection />
      <Footer />
    </div>
  );
};

export default HomePage;
