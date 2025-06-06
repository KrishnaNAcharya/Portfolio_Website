import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PropTypes from 'prop-types';

export const HoverEffect = ({
  items,
  className,
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >      {items.map((item, idx) => (
        <a
          href={item?.link}
          target={item?.link ? "_blank" : undefined}
          rel={item?.link ? "noopener noreferrer" : undefined}
          key={item.id} // Changed to item.id for a more reliable key
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

// PropTypes validation
HoverEffect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string
  })).isRequired,
  className: PropTypes.string
};

export const Card = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black/50 backdrop-blur-sm border border-transparent dark:border-white/[0.2] group-hover:border-emerald-500 group-hover:shadow-[0_0_15px_1px_rgba(16,185,129,0.6)] relative z-20 flex flex-col transition-all duration-200", // Ensured flex flex-col, added neon shadow and updated border on hover
        className
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export const CardTitle = ({
  className,
  children,
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 text-2xl md:text-3xl", className)}>
      {children}
    </h4>
  );
};

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export const CardDescription = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-base md:text-lg flex-grow flex flex-col", // Added flex flex-col, kept flex-grow
        className
      )}
    >
      {children}
    </div>
  );
};

CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
