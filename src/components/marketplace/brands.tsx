"use client";

import { motion } from "framer-motion";
import { storeList } from "@/data/stores";

export function Brands() {
  return (
    <section className="relative py-24 border-y border-border/60 bg-card/40 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Houses of Rokswood</span>
          <p className="font-display text-2xl md:text-3xl text-ivory/90 mt-4 max-w-2xl mx-auto text-balance">
            Four disciplined shops. <span className="italic text-bone/70">One global commerce floor.</span>
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex marquee w-max gap-20 items-center">
            {[...storeList, ...storeList, ...storeList].map((store, i) => (
              <div key={`${store.slug}-${i}`} className="flex items-center justify-center h-20 w-44 shrink-0">
                <img src={store.logo} alt={`${store.name} logo`} loading="lazy" className="logo-mono max-h-16 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
