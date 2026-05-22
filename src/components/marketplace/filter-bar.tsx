"use client";

import { motion } from "framer-motion";

type Props = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export function FilterBar({ categories, active, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm transition-colors duration-300 ease-silk ${
              isActive ? "text-ink" : "text-bone/70 hover:text-ivory"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-ivory shadow-soft"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
