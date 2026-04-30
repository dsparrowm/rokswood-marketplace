"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/marketplace/theme-toggle";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  badge: string;
  title: string;
  italic: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ badge, title, italic, description, children, footer }: Props) {
  return (
    <main className="min-h-screen bg-background text-foreground grid lg:grid-cols-2 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-bone hover:text-ivory transition-colors group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Marketplace
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-ember-pulse" />
            <span className="font-display text-lg text-ivory">Rokswood</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease }} className="hidden lg:flex relative items-end p-14 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className="absolute inset-0 grid-noise opacity-50" />
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease }}
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[140px]"
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }} className="max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.4em] text-bone">{badge}</span>
          </div>
          <h1 className="font-display text-6xl leading-[0.95] gradient-text text-balance">
            {title} <span className="italic font-light">{italic}</span>
          </h1>
          <p className="mt-6 text-bone/80 leading-relaxed text-pretty">{description}</p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              ["3", "Stores"],
              ["∞", "Storefronts"],
              ["1", "Hive"],
            ].map(([number, label]) => (
              <div key={label} className="border-l border-border pl-3">
                <div className="font-display text-2xl text-ivory">{number}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.aside>

      <section className="relative flex items-center justify-center p-6 sm:p-12 pt-28 lg:pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="w-full max-w-md">
          {children}
          {footer && <div className="mt-8 text-center text-sm text-bone">{footer}</div>}
        </motion.div>
      </section>
    </main>
  );
}
