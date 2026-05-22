"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const demoAgentCredentials = {
  email: "agent@rokswood.com",
  password: "AgentDemo123",
};

const agentLoginSchema = z.object({
  email: z.string().email("Enter a valid agent email"),
  password: z.string().min(8, "Enter at least 8 characters"),
});

type AgentLoginValues = z.infer<typeof agentLoginSchema>;

const inputClassName =
  "h-12 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-11 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]";

export default function AgentLoginForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AgentLoginValues>({
    resolver: zodResolver(agentLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit((values) => {
    const emailMatches = values.email.trim().toLowerCase() === demoAgentCredentials.email;
    const passwordMatches = values.password === demoAgentCredentials.password;

    if (!emailMatches || !passwordMatches) {
      setError("root", {
        type: "manual",
        message: "Agent credentials were not recognised.",
      });
      return;
    }

    router.push("/agents/dashboard");
  });

  const fillDemoCredentials = () => {
    setValue("email", demoAgentCredentials.email, { shouldValidate: true });
    setValue("password", demoAgentCredentials.password, { shouldValidate: true });
  };

  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-[0_20px_50px_color-mix(in_srgb,var(--bg-dark)_10%,transparent)] sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-payment)]">
          Agent Portal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
          Sign in
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
          Use your agent account to continue.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-xs font-semibold text-[var(--text-muted)]">Email Address</span>
          <span className="relative mt-2 block">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
            />
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              className={inputClassName}
              placeholder="agent@rokswood.com"
            />
          </span>
          {errors.email?.message ? (
            <span className="mt-1 block text-xs text-[var(--state-error)]">{errors.email.message}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-[var(--text-muted)]">Password</span>
          <span className="relative mt-2 block">
            <LockKeyhole
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
            />
            <input
              {...register("password")}
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              className={inputClassName}
              placeholder="Enter password"
            />
            <button
              type="button"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              onClick={() => setPasswordVisible((current) => !current)}
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[var(--text-light)] transition-colors hover:bg-[var(--bg-tag)] hover:text-[var(--text-primary)]"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
            </button>
          </span>
          {errors.password?.message ? (
            <span className="mt-1 block text-xs text-[var(--state-error)]">{errors.password.message}</span>
          ) : null}
        </label>

        <div className="flex items-center justify-between gap-4 text-xs">
          <label className="flex items-center gap-2 font-medium text-[var(--text-muted)]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--border-default)] accent-[var(--accent-payment)]"
            />
            Keep me signed in
          </label>
          <Link href="/agents" className="font-semibold text-[var(--accent-payment)] hover:underline">
            Apply for access
          </Link>
        </div>

        {errors.root?.message ? (
          <div className="rounded-md border border-[color-mix(in_srgb,var(--state-error)_30%,var(--border-default))] bg-[color-mix(in_srgb,var(--state-error)_7%,var(--bg-surface))] px-3 py-2 text-xs font-medium text-[var(--state-error)]">
            {errors.root.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] shadow-lg shadow-[color-mix(in_srgb,var(--bg-dark)_18%,transparent)] transition-colors hover:bg-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          Sign in
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <div className="mt-6 rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Demo Agent</p>
            <p className="mt-1 break-all font-mono text-xs text-[var(--text-muted)]">
              {demoAgentCredentials.email}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
              {demoAgentCredentials.password}
            </p>
          </div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tag)]"
          >
            Use Demo
          </button>
        </div>
      </div>
    </div>
  );
}
