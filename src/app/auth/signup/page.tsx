"use client";

import { motion } from "framer-motion";
import { Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";

const strength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export default function SignUpPage() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const score = useMemo(() => strength(password), [password]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Agent account wiring is ready for your auth provider.");
  };

  return (
    <AuthShell
      badge="Become an Agent"
      title="Build your"
      italic="storefront."
      description="Agent accounts are for approved sellers only. Customers can shop the marketplace as guests without creating an account."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary hover:text-ivory transition-colors">
            Sign in
          </Link>
        </>
      }
    >
      <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Create Account</div>
      <h2 className="font-display text-4xl text-ivory leading-tight">
        Join the <span className="italic font-light">network.</span>
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
          <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Full name</label>
          <input type="text" autoComplete="name" placeholder="Ada Okafor" className="w-full h-12 px-4 rounded-xl bg-card border border-border text-ivory placeholder:text-bone/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Email</label>
          <input type="email" autoComplete="email" placeholder="agent@rokswood.com" className="w-full h-12 px-4 rounded-xl bg-card border border-border text-ivory placeholder:text-bone/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Password</label>
          <div className="relative">
            <input type={show ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="w-full h-12 px-4 pr-12 rounded-xl bg-card border border-border text-ivory placeholder:text-bone/40 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all" />
            <button type="button" onClick={() => setShow((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-bone hover:text-ivory transition-colors" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="mt-2 flex gap-1.5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`h-1 flex-1 rounded-full transition-all duration-500 ${score >= item ? (score >= 3 ? "bg-primary" : "bg-bone") : "bg-ash"}`} />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1.5">
            <Check className="w-3 h-3" /> 8+ characters · uppercase · number
          </p>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full h-12 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity">
          Create account
        </motion.button>
        <p className="text-[11px] text-muted-foreground text-center pt-2">
          By continuing you agree to Rokswood&apos;s <Link href="/terms" className="text-primary hover:text-ivory">Terms</Link> and <Link href="/privacy" className="text-primary hover:text-ivory">Privacy Policy</Link>.
        </p>
      </form>
    </AuthShell>
  );
}
