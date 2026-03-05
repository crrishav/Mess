import React from "react";

/**
 * AddToCartButton Component
 * Icon-only cart button that matches the ShopNowButton styling.
 * Same height and hover background-fill animation, but with a compact width.
 */
const AddToCartButton = ({ onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add to cart"
      className={`
        relative overflow-hidden
        w-12 md:w-14
        py-3
        border-[1.5px] border-[#FCE7CC]
        text-[#FCE7CC] hover:text-black
        font-inter font-bold text-lg leading-7 tracking-wide uppercase
        bg-transparent
        flex items-center justify-center
        transition-all duration-500 ease-in-out
        group cursor-pointer
        ${className}
      `}
    >
      {/* Background Fill Animation Layer (same behavior as ShopNowButton) */}
      <span
        className="
          absolute inset-0 
          bg-[#FCE7CC] 
          translate-y-full group-hover:translate-y-0
          transition-transform duration-500 ease-in-out
          -z-10
        "
      ></span>

      {/* Cart Icon */}
      <span className="relative z-10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 text-[#FCE7CC] transition-colors duration-500 ease-in-out group-hover:text-black"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M7.25 18.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm9.5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM4 4.75h1.52c.39 0 .73.25.85.62L7.9 10.5h8.67a.75.75 0 0 1 .73.92l-.84 3.5a.86.86 0 0 1-.83.66H8.22a.86.86 0 0 1-.84-.65L5.8 6.5H4a.75.75 0 0 1 0-1.5Z"
          />
        </svg>
        <span className="sr-only font-inter">Add To Cart</span>
      </span>
    </button>
  );
};

export default AddToCartButton;

