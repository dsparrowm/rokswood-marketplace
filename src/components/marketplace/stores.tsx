"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { storeList } from "@/data/stores";

const ease = [0.22, 1, 0.36, 1] as const;

export function Stores() {
  return (
    <section id="stores" className="relative py-32 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.4em] text-bone/70">Four Stores · One Roof</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] gradient-text text-balance">
              Choose your <span className="italic font-light">discipline.</span>
            </h2>
          </div>
          <p className="text-bone/70 max-w-sm text-pretty">
            Each store is a category of its own, curated, deeply integrated and available globally with localized payment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {storeList.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-3xl border border-border bg-gradient-card overflow-hidden shadow-elegant"
            >
              <Link href={`/store/${store.slug}`} className="absolute inset-0 z-10" aria-label={`Enter ${store.name} store`} />
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={store.hero}
                  alt={store.tagline}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${store.accent} mix-blend-screen opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/24 to-black/10" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="font-display text-sm tracking-widest text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
                    - {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md">
                    {store.badge.split("· ")[1]}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mb-4 flex h-14 max-w-48 items-end">
                    <img src={store.logo} alt={`${store.name} logo`} loading="lazy" className="max-h-14 max-w-full object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]" />
                  </div>
                  <div className="font-display text-xs tracking-[0.4em] uppercase text-primary mb-2">{store.name}</div>
                  <h3 className="font-display text-3xl text-white leading-tight">
                    {store.title} <span className="italic font-light">{store.italic}</span>
                  </h3>
                </div>
              </div>

              <div className="p-7 flex flex-col gap-6 flex-1">
                <p className="text-sm text-bone/70 leading-relaxed text-pretty">{store.description}</p>
                <div className="flex flex-wrap gap-2">
                  {store.categories.slice(1).map((item) => (
                    <span key={item} className="text-[11px] tracking-wide text-bone/70 px-3 py-1 rounded-full border border-border bg-ash/40">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-bone/70 group-hover:text-ivory transition-colors duration-500">
                    Enter Store
                  </span>
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-ash group-hover:bg-primary text-bone group-hover:text-primary-foreground transition-all duration-500 ease-silk">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500 ease-silk" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
