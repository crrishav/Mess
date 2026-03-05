import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const CartOverlay = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const rootRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const tlRef = useRef(null);

  const mockItems = useMemo(
    () => [
      { id: 1, name: "Sea Salt Spray", price: "Rs. 799", qty: 1 },
      { id: 2, name: "Matte Clay", price: "Rs. 999", qty: 1 },
    ],
    []
  );

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!shouldRender) return;

    const root = rootRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!root || !backdrop || !panel || !content) return;

    const ctx = gsap.context(() => {
      // Initial states (so GSAP always has a predictable baseline)
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(panel, { x: "100%" });
      gsap.set(content, { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      // Step 1: Overlay fades in
      tl.to(backdrop, { autoAlpha: 1, duration: 0.22 }, 0);
      // Step 2: Panel slides from right
      tl.to(panel, { x: "0%", duration: 0.45 }, 0);
      // Step 3: Content fades in + slides up
      tl.to(content, { autoAlpha: 1, y: 0, duration: 0.32 }, 0.18);

      tlRef.current = tl;
    }, root);

    return () => {
      tlRef.current?.kill?.();
      tlRef.current = null;
      ctx.revert();
    };
  }, [shouldRender]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      tl.eventCallback("onReverseComplete", null);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setShouldRender(false));
      tl.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-label="Cart"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60"
        onClick={() => onClose?.()}
      ></div>

      {/* Right panel */}
      <aside
        ref={panelRef}
        className="
          fixed right-0 top-0 h-full
          w-[92vw] max-w-[460px]
          bg-[#1D1D1D] text-white font-inter
          border-l border-white/10
          shadow-[0_40px_120px_rgba(0,0,0,0.55)]
          flex flex-col
          will-change-transform
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={contentRef}
          className="h-full flex flex-col"
        >
          {/* Header */}
          <div className="px-6 md:px-7 pt-6 md:pt-7 pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.28em] opacity-70 font-inter">
                Cart
              </span>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">
                Your Cart
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onClose?.()}
              className="
                w-10 h-10 rounded-md
                border border-white/10
                text-white/80 hover:text-white
                hover:border-white/20
                transition-all duration-300 ease-out
                flex items-center justify-center
              "
              aria-label="Close cart"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto px-6 md:px-7 py-5">
            <div className="flex flex-col gap-4">
              {mockItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-black/20 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {item.name}
                    </div>
                    <div className="text-xs opacity-70">
                      Qty: {item.qty}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#FCE7CC] whitespace-nowrap">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-6 md:px-7 py-5 border-t border-white/10">
            <button
              type="button"
              className="
                w-full
                py-3
                border-[1.5px] border-[#FCE7CC]
                text-black
                bg-[#FCE7CC]
                font-inter font-bold text-sm md:text-base tracking-wide uppercase
                rounded-md
                transition-opacity duration-300 ease-out
                hover:opacity-90
              "
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={() => onClose?.()}
              className="
                w-full mt-3
                py-3
                border border-white/15
                text-white
                bg-transparent
                font-inter font-bold text-sm md:text-base tracking-wide uppercase
                rounded-md
                transition-all duration-300 ease-out
                hover:border-white/25 hover:opacity-90
              "
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartOverlay;

