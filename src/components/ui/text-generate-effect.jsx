"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration, // Use the passed duration
          delay: stagger(0.2),
        }
      );
    }
  }, [scope, animate, filter, duration, words]); // Changed scope.current to scope

  return (
    <motion.div ref={scope} className={cn(className)}> {/* Apply className to the root motion.div */}
      {wordsArray.map((word, idx) => {
        return (
          <motion.span
            key={word + idx}
            className="opacity-0" // Spans are initially invisible, color will be inherited
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
