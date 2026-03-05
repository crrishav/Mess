"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const influencers = [
  {
    id: 1,
    name: "Aarav Sen",
    label: "Hair Creator",
    image: "/influencers/influencer-1.png",
  },
  {
    id: 2,
    name: "Mira Thapa",
    label: "Grooming Expert",
    image: "/influencers/influencer-2.png",
  },
  {
    id: 3,
    name: "Rohan KC",
    label: "Lifestyle Influencer",
    image: "/influencers/influencer-3.png",
  },
];

const TrustedInfluencersSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const marqueeTl = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth;

      marqueeTl.current = gsap.to(track, {
        x: -totalWidth / 2,
        duration: 30,
        repeat: -1,
        ease: "linear",
        modifiers: {
          x: (x) => {
            const current = parseFloat(x);
            const wrapped = ((current % totalWidth) + totalWidth) % totalWidth;
            return `${wrapped * -1}px`;
          },
        },
      });
    }, sectionRef);

    return () => {
      if (marqueeTl.current) {
        marqueeTl.current.kill();
      }
      ctx.revert();
    };
  }, []);

  const handleHover = (isHovering) => {
    if (!marqueeTl.current) return;
    if (isHovering) {
      marqueeTl.current.timeScale(0.2);
    } else {
      marqueeTl.current.timeScale(1);
    }
  };

  const items = [...influencers, ...influencers];

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-[#000000] text-white py-20 md:py-28 px-6 md:px-16 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-[1440px] flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold font-inter tracking-tight">
            Trusted By Influencers
          </h2>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 md:gap-10 w-max"
          >
            {items.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                className="bg-[#1F1F1F] rounded-2xl border border-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] px-6 py-6 md:px-7 md:py-7 flex items-center gap-4 md:gap-5 min-w-[220px] md:min-w-[260px] cursor-pointer transform transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-black/40 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base font-bold font-inter">
                    {item.name}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.18em] opacity-70 font-inter">
                    {item.label}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedInfluencersSection;

