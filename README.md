# MESS - Premium Hair Care & Grooming

A modern, animated e-commerce website for **MESS**, a premium hair care and grooming brand. Built with React + Vite, featuring smooth scroll experiences, advanced GSAP animations, and a sleek user interface to showcase our product lineup.

## Features

- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll interactions
- **Advanced Animations**: GSAP ScrollTrigger for scroll-based element reveals and transitions
- **Product Showcase**: Dynamic product grid with descriptions for our line of hair care products:
  - Sea Salt Spray
  - Matte Clay
  - Refreshing Shampoo
  - Nourishing Conditioner
- **Interactive Components**: Nepal Map integration, Shop Now button, and responsive navigation
- **Error Handling**: ErrorBoundary component for robust error management
- **Modern Styling**: Tailwind CSS v4 for responsive, utility-first design

## Product Range

MESS specializes in premium grooming products designed for natural texture, hold, and hair health:
- Styling products with flexible hold and natural finishes
- Cleansing and conditioning solutions for all hair types
- Products infused with natural ingredients and minerals

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Next-gen build tool with hot module replacement
- **Tailwind CSS 4** - Utility-first CSS framework
- **GSAP 3** - Animation library with ScrollTrigger plugin
- **Lenis** - Smooth scrolling library
- **ESLint** - Code quality and consistency

## Getting Started

### Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173` with HMR enabled.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── Components/     # Reusable UI components (animations, nav, map, etc.)
├── Pages/         # Page-level components
├── assets/        # Product images and media
├── App.jsx        # Root component
└── homePage.jsx   # Main landing page with product showcase
```
