"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignInPage() {
  const [show, setShow] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Auth wiring is ready for your provider.");
  };

  return (
    <AuthShell
      badge="Agent Access"
      title="Welcome"
      italic="back."
      description="Agent sign in for storefronts, referrals, commissions and payouts. Customers do not need accounts to shop."
      footer={
        <>
          New to Rokswood?{" "}
          <Link href="/auth/signup" className="text-primary hover:text-ivory transition-colors">
            Create an account
          </Link>
        </>
      }
    >
      <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Sign In</div>
      <h2 className="font-display text-4xl text-ivory leading-tight">
        Open your <span className="italic font-light">marketplace.</span>
      </h2>
      <button type="button" className="mt-8 w-full h-12 rounded-full border border-border bg-card hover:bg-ash text-ivory text-sm flex items-center justify-center gap-3 transition-colors">
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1S8.7 5.9 12 5.9c1.9 0 3.1.8 3.8 1.4l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
        </svg>
        Continue with Google
      </button>
      <div className="my-6 flex items-center gap-4">
        <div className="hairline h-px flex-1" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">or with email</span>
        <div className="hairline h-px flex-1" />
      </div>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Email</label>
          <input type="email" autoComplete="email" placeholder="agent@rokswood.com" className="w-full h-12 px-4 rounded-xl bg-card border border-border text-ivory placeholder:text-bone/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Password</label>
            <Link href="/support" className="text-[11px] text-primary hover:text-ivory transition-colors">Forgot?</Link>
          </div>
          <div className="relative">
            <input type={show ? "text" : "password"} autoComplete="current-password" placeholder="Password" className="w-full h-12 px-4 pr-12 rounded-xl bg-card border border-border text-ivory placeholder:text-bone/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all" />
            <button type="button" onClick={() => setShow((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-bone hover:text-ivory transition-colors" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full h-12 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity">
          Sign in
        </motion.button>
      </form>
    </AuthShell>
  );
}
