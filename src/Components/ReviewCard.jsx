import React, { forwardRef } from "react";

/**
 * ReviewCard Component
 * Reusable, GSD-style review card for testimonials.
 */
const ReviewCard = forwardRef(
  ({ name, title, children, className = "" }, ref) => {
    return (
      <article
        ref={ref}
        className={`bg-[#2D2D2D] text-white font-inter reveal-hidden border border-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.45)] rounded-lg px-6 py-7 md:px-8 md:py-9 flex flex-col gap-4 max-w-xs w-full flex-shrink-0 ${className}`}
      >
        <div className="flex flex-col gap-1">
          <h4 className="text-base md:text-lg font-bold leading-tight">
            {name}
          </h4>
          {title ? (
            <span className="text-[11px] md:text-xs font-normal uppercase tracking-[0.18em] opacity-70">
              {title}
            </span>
          ) : null}
        </div>
        <p className="text-xs md:text-sm font-normal leading-relaxed opacity-80">
          {children}
        </p>
      </article>
    );
  }
);

export default ReviewCard;

