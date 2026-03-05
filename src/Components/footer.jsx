import React from "react";
import logo from "../assets/logo.svg";

const SocialIcon = ({ href, label, children }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        inline-flex items-center justify-center
        w-7 h-7
        text-[#FCE7CC]
        transition-opacity duration-300 ease-out
        hover:opacity-80
      "
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#1D1D1D] text-white font-inter">
      <div className="w-full max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-12 md:gap-20">
          {/* Left: Brand + Social + Copyright */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex items-center">
              <img
                src={logo}
                alt="MESS Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>

            <div className="flex items-center gap-3">
              <SocialIcon href="#" label="Instagram">
                {/* Font Awesome - Instagram (Brands) */}
                <svg
                  viewBox="0 0 448 512"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.7-9.9-67.2-36.2-93.5-26.2-26.2-57.8-34.4-93.5-36.2-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.2 9.9-93.5 36.2S9.9 127.8 8.1 163.5c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.2 36.2 93.5s57.8 34.4 93.5 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.2-9.9 93.5-36.2 26.2-26.2 34.4-57.8 36.2-93.5 2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#" label="Facebook">
                {/* Font Awesome - Facebook (Brands) */}
                <svg
                  viewBox="0 0 320 512"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M279.1 288l14.2-92.7h-88.9V117.8c0-25.4 12.4-50.1 52.2-50.1H297V6.3S259.5 0 223.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.9V288h79.4v224h97.9V288z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#" label="WhatsApp">
                {/* Font Awesome - WhatsApp (Brands) */}
                <svg
                  viewBox="0 0 448 512"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 224.2 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.5 27h.1c122.3 0 222-99.6 222-222 0-59-23.2-114.8-65.1-156.9zM224.2 438.7c-33.4 0-66.2-9-94.7-26.1l-6.8-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.8 184.6-184.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.7 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.1 15.2 48.8 16.5 66.4 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </SocialIcon>
            </div>

            <div className="text-xs md:text-sm opacity-80">
              © 2026 Mess. All rights reserved.
            </div>
          </div>

          {/* Right: Link columns */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-10 md:gap-16">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-semibold">Site Map</div>
              <nav className="flex flex-col gap-2 text-sm opacity-90">
                <a className="hover:opacity-80 transition-opacity duration-300" href="#">
                  Homepage
                </a>
                <a className="hover:opacity-80 transition-opacity duration-300" href="#">
                  Shop
                </a>
                <a className="hover:opacity-80 transition-opacity duration-300" href="#">
                  Contact Us
                </a>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-sm font-semibold">Legal</div>
              <nav className="flex flex-col gap-2 text-sm opacity-90">
                <a className="hover:opacity-80 transition-opacity duration-300" href="#">
                  Privacy Policy
                </a>
                <a className="hover:opacity-80 transition-opacity duration-300" href="#">
                  Terms Of Services
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

