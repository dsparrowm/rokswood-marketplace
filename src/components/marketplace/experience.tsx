"use client";

import { motion } from "framer-motion";
import { Globe2, ShieldCheck, Wallet, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Guest checkout, zero friction",
    body: "No forced sign-up. Buy as a guest, receive a unique order reference and track everything from a single code.",
  },
  {
    icon: Globe2,
    title: "Borderless by design",
    body: "Geo-detected currency and gateway, Paystack for Nigeria, Stripe for international: USD, CAD, GBP, EUR.",
  },
  {
    icon: ShieldCheck,
    title: "Synchronized with Hive",
    body: "Inventory, orders, dispatch and analytics flow live into RokswoodHive, your operational brain.",
  },
  {
    icon: Wallet,
    title: "Agent commerce network",
    body: "Personal storefronts, referral codes and a smart wallet. Turn distributors into a self-driving sales force.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  return (
    <section id="agents" className="relative py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-bone/70">The Experience</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] gradient-text text-balance">
              Premium, <span className="italic font-light">end</span>
              <br />to <span className="italic font-light">end.</span>
            </h2>
            <p className="text-bone/70 mt-8 leading-relaxed max-w-md text-pretty">
              Apple-store simplicity. Stripe-checkout cleanness. A marketplace built for
              international procurement and a reseller network with skin in the game.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="group relative p-7 rounded-2xl border border-border bg-gradient-card hover:border-primary/40 transition-all duration-500 ease-silk overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-ash border border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 ease-silk">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-2xl text-ivory mt-6 leading-tight">{feature.title}</h3>
                  <p className="text-sm text-bone/70 mt-3 leading-relaxed text-pretty">{feature.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
