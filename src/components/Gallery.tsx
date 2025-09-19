"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryProps = {
  images: string[]; // supply at least 7 images (component will gracefully fallback)
};

export default function GalleryMosaic({ images }: GalleryProps) {
  // ensure we have at least 7 placeholders
  const imgs = [
    ...images,
    // fallback placeholders (won't be requested if user provided enough images)
    "https://picsum.photos/800/1000",
    "https://picsum.photos/900/700",
    "https://picsum.photos/800/600",
    "https://picsum.photos/700/900",
    "https://picsum.photos/600/600",
    "https://picsum.photos/900/500",
    "https://picsum.photos/1000/800",
  ].slice(0, 8);

  const layoutOrder = {
    topLeftSmall: 0,
    leftTall: 1,
    centerLarge: 2,
    rightTall: 3,
    bottomLeftSmall: 4,
    bottomCenterMedium: 5,
    bottomRightSmall: 6,
    extra: 7,
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // keyboard nav for lightbox
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((s) => (s === null ? null : (s + 1) % imgs.length));
      if (e.key === "ArrowLeft")
        setSelectedIndex((s) =>
          s === null ? null : (s - 1 + imgs.length) % imgs.length
        );
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, imgs.length]);

  const open = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const next = () =>
    setSelectedIndex((s) => (s === null ? null : (s + 1) % imgs.length));
  const prev = () =>
    setSelectedIndex((s) => (s === null ? null : (s - 1 + imgs.length) % imgs.length));

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header (optional) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-light">
            Journey in <span className="italic font-serif">Asia</span>
          </h2>
        </div>

        {/* MOSAIC GRID */}
        <div className="gallery-grid">
          {/* top-left small */}
          <div
            className="item item-top-left"
            role="button"
            onClick={() => open(layoutOrder.topLeftSmall)}
            onKeyDown={() => open(layoutOrder.topLeftSmall)}
            tabIndex={0}
            aria-label="Open image 1"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.topLeftSmall]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>

          {/* center large */}
          <div
            className="item item-center-large"
            role="button"
            onClick={() => open(layoutOrder.centerLarge)}
            tabIndex={0}
            aria-label="Open main image"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.centerLarge]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>

          {/* right tall */}
          <div
            className="item item-right-tall"
            role="button"
            onClick={() => open(layoutOrder.rightTall)}
            tabIndex={0}
            aria-label="Open image 4"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.rightTall]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>

          {/* left tall (middle left) */}
          <div
            className="item item-left-tall"
            role="button"
            onClick={() => open(layoutOrder.leftTall)}
            tabIndex={0}
            aria-label="Open image 2"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.leftTall]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>

          {/* bottom-left small */}
          <div
            className="item item-bottom-left"
            role="button"
            onClick={() => open(layoutOrder.bottomLeftSmall)}
            tabIndex={0}
            aria-label="Open image 5"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.bottomLeftSmall]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>

          {/* bottom-center medium */}
          <div
            className="item item-bottom-center"
            role="button"
            onClick={() => open(layoutOrder.bottomCenterMedium)}
            tabIndex={0}
            aria-label="Open image 6"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.bottomCenterMedium]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>

          {/* bottom-right small */}
          <div
            className="item item-bottom-right"
            role="button"
            onClick={() => open(layoutOrder.bottomRightSmall)}
            tabIndex={0}
            aria-label="Open image 7"
          >
            <div className="img-wrap">
              <Image src={imgs[layoutOrder.bottomRightSmall]} alt="" fill className="object-cover" />
              <div className="overlay">
                <Search className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-5xl px-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={imgs[selectedIndex]}
                  alt=""
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* close */}
              <button
                aria-label="Close"
                className="lightbox-btn top-right"
                onClick={close}
                title="Close (Esc)"
              >
                <X />
              </button>

              {/* prev */}
              <button
                aria-label="Previous"
                className="lightbox-btn left-center"
                onClick={prev}
                title="Previous (Left arrow)"
              >
                <ChevronLeft />
              </button>

              {/* next */}
              <button
                aria-label="Next"
                className="lightbox-btn right-center"
                onClick={next}
                title="Next (Right arrow)"
              >
                <ChevronRight />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style jsx>{`
        .gallery-grid {
          display: grid;
          gap: 18px;
          /* desktop mosaic (3 cols) */
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 220px 220px 220px;
          grid-template-areas:
            "topLeft centerLarge rightTall"
            "leftTall centerLarge rightTall"
            "bottomLeft bottomCenter bottomRight";
        }

        .item { border-radius: 14px; overflow: hidden; position: relative; }
        .img-wrap { position: relative; width: 100%; height: 100%; }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 180ms ease, opacity 180ms ease;
          opacity: 0;
        }
        .item:hover .overlay,
        .item:focus .overlay {
          background: rgba(0, 0, 0, 0.45);
          opacity: 1;
        }
        .icon { color: white; width: 44px; height: 44px; }

        /* assign grid areas */
        .item-top-left { grid-area: topLeft; }
        .item-center-large { grid-area: centerLarge; border-radius: 18px; }
        .item-right-tall { grid-area: rightTall; }
        .item-left-tall { grid-area: leftTall; }
        .item-bottom-left { grid-area: bottomLeft; }
        .item-bottom-center { grid-area: bottomCenter; }
        .item-bottom-right { grid-area: bottomRight; }

        /* LIGHTBOX BUTTONS */
        .lightbox-btn {
          position: absolute;
          background: rgba(255,255,255,0.95);
          border-radius: 999px;
          padding: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
          border: none;
          cursor: pointer;
        }
        .lightbox-btn.top-right { right: 8px; top: -32px; }
        .lightbox-btn.left-center { left: -28px; top: 50%; transform: translateY(-50%); }
        .lightbox-btn.right-center { right: -28px; top: 50%; transform: translateY(-50%); }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 220px 220px 220px 220px;
            grid-template-areas:
              "centerLarge centerLarge"
              "topLeft rightTall"
              "leftTall bottomCenter"
              "bottomLeft bottomRight";
          }
          .lightbox-btn.top-right { top: 12px; right: 12px; }
          .lightbox-btn.left-center { left: 8px; }
          .lightbox-btn.right-center { right: 8px; }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 220px;
            grid-template-areas:
              "centerLarge"
              "topLeft"
              "rightTall"
              "leftTall"
              "bottomLeft"
              "bottomCenter"
              "bottomRight";
          }
          .lightbox-btn.left-center,
          .lightbox-btn.right-center {
            display: none;
          }
          .lightbox-btn.top-right { top: 8px; right: 8px; }
        }
      `}</style>
    </>
  );
}
