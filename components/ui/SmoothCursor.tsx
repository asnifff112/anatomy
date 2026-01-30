"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function SmoothCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the "Smooth" effect
  const springConfig = { damping: 25, stiffness: 200 };
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* The Smooth Ring */}
      <motion.div
        style={{
          translateX: sx,
          translateY: sy,
          left: -15,
          top: -15,
        }}
        className="fixed w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
      {/* The Center Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -2,
          top: -2,
        }}
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
}