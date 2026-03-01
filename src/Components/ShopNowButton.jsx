import React from "react";

/**
 * ShopNowButton Component
 * A premium, reusable button with a smooth background fill animation on hover.
 * Matches the design: transparent bg, light-cream border -> light-cream bg, black text on hover.
 */
const ShopNowButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        px-10 py-3 
        border-[1.5px] border-[#FCE7CC]
        text-[#FCE7CC] hover:text-black
        font-inter font-bold text-lg tracking-wide uppercase
        bg-transparent
        transition-all duration-500 ease-in-out
        group cursor-pointer
        ${className}
      `}
    >
      {/* Background Fill Animation Layer */}
      <span className="
        absolute inset-0 
        bg-[#FCE7CC] 
        translate-y-full group-hover:translate-y-0
        transition-transform duration-500 ease-in-out
        -z-10
      "></span>
      
      <span className="relative z-10">Shop Now</span>
    </button>
  );
};

export default ShopNowButton;
