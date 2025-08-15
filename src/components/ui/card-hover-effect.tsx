import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState, ReactNode } from "react"

interface HoverEffectItem {
  id: string | number
  title: ReactNode
  description: ReactNode
  link?: string
}

interface HoverEffectProps {
  items: HoverEffectItem[]
  className?: string
}

interface CardProps {
  className?: string
  children: ReactNode
}

interface CardTitleProps {
  className?: string
  children: ReactNode
}

interface CardDescriptionProps {
  className?: string
  children: ReactNode
}

export const HoverEffect = ({
  items,
  className,
}: HoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid py-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
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
        </div>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black/50 backdrop-blur-sm border border-transparent dark:border-white/[0.2] group-hover:border-emerald-500 group-hover:shadow-[0_0_15px_1px_rgba(16,185,129,0.6)] relative z-20 flex flex-col transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: CardTitleProps) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 text-2xl md:text-3xl", className)}>
      {children}
    </h4>
  )
}

export const CardDescription = ({
  className,
  children,
}: CardDescriptionProps) => {
  return (
    <div
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-base md:text-lg flex-grow flex flex-col",
        className
      )}
    >
      {children}
    </div>
  )
}
