"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1 },
      { duration: 2, delay: stagger(0.2) }
    );
  }, [scope.current]);

  return (
    <div className="font-light leading-relaxed text-gray-400 text-lg">
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0 text-white/80"
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};