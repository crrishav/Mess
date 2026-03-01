const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'src', 'assets', 'np.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// match all <path ... /> elements
const pathRegex = /<path\s+d="([^"]+)"\s+id="([^"]+)"\s+name="([^"]+)">(?:\s*<\/path>)?/g;
let match;
const zones = [];

while ((match = pathRegex.exec(svgContent)) !== null) {
  zones.push({
    d: match[1],
    id: match[2],
    name: match[3],
  });
}

const componentCode = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const zones = ${JSON.stringify(zones, null, 2)};

export default function NepalMap({ className = '' }) {
  const mapRef = useRef(null);
  const pathsRef = useRef([]);

  useEffect(() => {
    // Only register ScrollTrigger on client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Safety check just in case elements aren't rendered yet
    const paths = pathsRef.current.filter(Boolean);
    if (!paths.length) return;

    const ctx = gsap.context(() => {
      // Set initial styles for drawing animation
      paths.forEach((path) => {
        const length = Math.ceil(path.getTotalLength()); // calculate once for performance
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
          stroke: "rgba(255, 255, 255, 0.4)",
          strokeWidth: 1.5,
        });
      });

      // Create a timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%", // Animate when map is 80% down viewport
          once: true,
        },
      });

      // First animate the strokes drawing in randomly or sequentially
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.out",
        stagger: {
          amount: 1.5,
          from: "random" // Makes it look sophisticated
        }
      })
      // Then brighten the strokes slightly
      .to(paths, {
        stroke: "rgba(255, 255, 255, 0.8)",
        duration: 1,
        ease: "power1.inOut"
      }, "-=1.5")
      // Then gently fade in subtle fillings to feel premium
      .to(paths, {
        fill: "rgba(255, 255, 255, 0.03)",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.05,
      }, "-=1.5"); // Overlap slightly with stroke drawing

      // Add a hover interaction for premium feel
      paths.forEach(path => {
        path.addEventListener('mouseenter', () => {
          gsap.to(path, { 
            fill: "rgba(255, 255, 255, 0.15)", 
            stroke: "rgba(255, 255, 255, 1)",
            duration: 0.3 
          });
        });
        path.addEventListener('mouseleave', () => {
          gsap.to(path, { 
            fill: "rgba(255, 255, 255, 0.03)", 
            stroke: "rgba(255, 255, 255, 0.8)",
            duration: 0.4 
          });
        });
      });

    }, mapRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mapRef} className={\`w-full max-w-4xl mx-auto flex justify-center items-center \${className}\`}>
      <svg 
        baseProfile="tiny" 
        viewBox="0 0 1000 569" 
        className="w-full h-auto drop-shadow-2xl opacity-90 transition-opacity duration-700"
        style={{ filter: "drop-shadow(0px 0px 30px rgba(255,255,255,0.05))" }}
      >
        <g id="features">
          {zones.map((zone, index) => (
            <path
              key={zone.id}
              ref={(el) => (pathsRef.current[index] = el)}
              d={zone.d}
              id={zone.id}
              name={zone.name}
              className="cursor-pointer transition-colors duration-300"
              style={{
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'Components', 'NepalMap.jsx'), componentCode);
console.log("NepalMap component created successfully.");
