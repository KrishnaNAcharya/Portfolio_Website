"use client"; // Keep if using Next.js App Router, otherwise remove

import { useMotionValue, motion, useMotionTemplate } from "framer-motion"; // Changed from motion/react
import React, { useState } from "react";
import { CanvasRevealEffect } from "./canvas-reveal-effect"; // Adjusted path
import { cn } from "../../lib/utils"; // Adjusted path

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "rgba(16, 185, 129, 0.15)", // Adjusted default spotlight color to a subtle emerald
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-6 md:p-8 rounded-xl relative border border-neutral-700 bg-neutral-900/70 backdrop-blur-md overflow-hidden", // Adjusted styling
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Spotlight effect div */}
      <motion.div
        className="pointer-events-none absolute z-10 -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
        }}
      />
      {/* CanvasRevealEffect container - ensure it's behind content but visible */}
      <div className="absolute inset-0 rounded-xl z-0"> {/* Removed overflow-hidden from here, parent has it */}
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none" // Ensure bg is transparent
            colors={[ // Emerald-like colors
              [16, 185, 129], // Emerald 500
              [5, 150, 105],  // Emerald 600
            ]}
            dotSize={2}
            showGradient={false} // Assuming the card's own bg + spotlight is enough
          />
        )}
      </div>
      {/* Content should be above the CanvasRevealEffect and spotlight div */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};
