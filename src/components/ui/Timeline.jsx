import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Timeline = ({
  items,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute top-0 left-[50%] -translate-x-1/2 h-full w-1 bg-emerald-500/20"
        )}
      />
      <div className="space-y-12">
        {items.map((item, idx) => (
          <motion.div
            key={`timeline-item-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 + 0.5 }}
            className={cn(
              "relative flex justify-between",
              idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
            )}
          >
            <div className="w-5/12" />
            <div className="z-10 flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: idx * 0.2 + 0.6 }}
                className={cn(
                  "w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                )}
              >
                {item.icon}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 + 0.7 }}
              className={cn(
                "w-5/12 shadow-lg shadow-emerald-900/20 rounded-lg p-4 md:p-6 bg-[#2a2a2a]/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 transition-colors duration-300"
              )}
            >
              <div className="flex flex-col">
                <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-300 mb-1">{item.date}</p>
                <p className="text-sm md:text-base text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
