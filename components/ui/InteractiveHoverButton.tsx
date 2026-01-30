"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

export default function InteractiveHoverButton({ text, className }: Props) {
  return (
    <motion.button
      whileHover="hover"
      initial="initial"
      className={`group relative overflow-hidden rounded-full bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Normal Text */}
        <motion.span
          variants={{
            initial: { x: 0, opacity: 1 },
            hover: { x: -10, opacity: 0 },
          }}
          className="relative z-10"
        >
          {text}
        </motion.span>

        {/* Hover Text & Icon */}
        <motion.div
          variants={{
            initial: { x: 20, opacity: 0 },
            hover: { x: 0, opacity: 1 },
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 text-black"
        >
          <span>{text}</span>
          <ArrowRight size={14} />
        </motion.div>
      </div>

      {/* Background Liquid Effect */}
      <motion.div
        variants={{
          initial: { scale: 0, opacity: 0 },
          hover: { scale: 1.5, opacity: 1 },
        }}
        className="absolute inset-0 -z-0 bg-gray-200/50 blur-xl transition-all"
      />
    </motion.button>
  );
}