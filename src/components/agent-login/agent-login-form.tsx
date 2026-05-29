"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Eye, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useAgentForgotPasswordMutation,
  useAgentLoginMutation,
  useAgentResetPasswordMutation,
} from "@/lib/hooks/use-agent-auth";
import type { AgentAuthSession } from "@/types/agent-auth";

const agentLoginSchema = z.object({
  email: z.string().email("Enter a valid agent email"),
  password: z.string().min(8, "Enter at least 8 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter the email on your agent account"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Enter the email on your agent account"),
  token: z.string().min(4, "Enter the reset token"),
  password: z.string().min(8, "Use at least 8 characters"),
});

type AgentLoginValues = z.infer<typeof agentLoginSchema>;
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
type AgentAuthMode = "login" | "forgot" | "reset";

const inputClassName =
  "h-12 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-11 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]";

function persistAgentSession(session?: AgentAuthSession) {
  if (!session) {
    return;
  }

  window.sessionStorage.setItem("rokswood_agent_session", JSON.stringify(session));
}

export default function AgentLoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AgentAuthMode>("login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const agentLogin = useAgentLoginMutation();
  const forgotPassword = useAgentForgotPasswordMutation();
  const resetPassword = useAgentResetPasswordMutation();
  const loginForm = useForm<AgentLoginValues>({
    resolver: zodResolver(agentLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const forgotPasswordForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });
  const resetPasswordForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      token: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmitLogin = loginForm.handleSubmit(async (values) => {
    try {
      const response = await agentLogin.mutateAsync({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });
      persistAgentSession(response.data);
      router.push("/agents/dashboard");
    } catch (error) {
      loginForm.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "Agent credentials were not recognised.",
      });
    }
  });

  const onSubmitForgotPassword = forgotPasswordForm.handleSubmit(async (values) => {
    const email = values.email.trim().toLowerCase();

    try {
      await forgotPassword.mutateAsync({ email });
      resetPasswordForm.setValue("email", email, { shouldValidate: true });
      setMode("reset");
    } catch (error) {
      forgotPasswordForm.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "Password reset could not be started.",
      });
    }
  });

  const onSubmitResetPassword = resetPasswordForm.handleSubmit(async (values) => {
    try {
      const response = await resetPassword.mutateAsync({
        email: values.email.trim().toLowerCase(),
        token: values.token.trim(),
        password: values.password,
      });
      persistAgentSession(response.data);
      router.push("/agents/dashboard");
    } catch (error) {
      resetPasswordForm.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "Password reset failed.",
      });
    }
  });

  const returnToLogin = () => {
    setMode("login");
    agentLogin.reset();
    forgotPassword.reset();
    resetPassword.reset();
    loginForm.clearErrors();
    forgotPasswordForm.clearErrors();
    resetPasswordForm.clearErrors();
  };

  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-[0_20px_50px_color-mix(in_srgb,var(--bg-dark)_10%,transparent)] sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-payment)]">
          Agent Portal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
          {mode === "login" ? "Sign in" : mode === "forgot" ? "Reset access" : "Set new password"}
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
          {mode === "login"
            ? "Use your approved agent account to continue."
            : mode === "forgot"
              ? "Enter your agent email and we will send a reset token."
              : "Enter the reset token and choose a new password."}
        </p>
      </div>

      {mode === "login" ? (
        <form onSubmit={onSubmitLogin} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Email Address</span>
            <span className="relative mt-2 block">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
              />
              <input
                {...loginForm.register("email")}
                type="email"
                autoComplete="email"
                className={inputClassName}
                placeholder="agent@rokswood.com"
              />
            </span>
            {loginForm.formState.errors.email?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">
                {loginForm.formState.errors.email.message}
              </span>
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
                {...loginForm.register("password")}
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
            {loginForm.formState.errors.password?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">
                {loginForm.formState.errors.password.message}
              </span>
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
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="cursor-pointer font-semibold text-[var(--accent-payment)] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {loginForm.formState.errors.root?.message ? (
            <div className="rounded-md border border-[color-mix(in_srgb,var(--state-error)_30%,var(--border-default))] bg-[color-mix(in_srgb,var(--state-error)_7%,var(--bg-surface))] px-3 py-2 text-xs font-medium text-[var(--state-error)]">
              {loginForm.formState.errors.root.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={agentLogin.isPending}
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] shadow-lg shadow-[color-mix(in_srgb,var(--bg-dark)_18%,transparent)] transition-colors hover:bg-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {agentLogin.isPending ? "Signing in..." : "Sign in"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      ) : null}

      {mode === "forgot" ? (
        <form onSubmit={onSubmitForgotPassword} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Agent Email</span>
            <span className="relative mt-2 block">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
              />
              <input
                {...forgotPasswordForm.register("email")}
                type="email"
                autoComplete="email"
                className={inputClassName}
                placeholder="agent@rokswood.com"
              />
            </span>
            {forgotPasswordForm.formState.errors.email?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">
                {forgotPasswordForm.formState.errors.email.message}
              </span>
            ) : null}
          </label>

          {forgotPasswordForm.formState.errors.root?.message ? (
            <div className="rounded-md border border-[color-mix(in_srgb,var(--state-error)_30%,var(--border-default))] bg-[color-mix(in_srgb,var(--state-error)_7%,var(--bg-surface))] px-3 py-2 text-xs font-medium text-[var(--state-error)]">
              {forgotPasswordForm.formState.errors.root.message}
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            <button
              type="button"
              onClick={returnToLogin}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tag)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="submit"
              disabled={forgotPassword.isPending}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {forgotPassword.isPending ? "Sending token..." : "Send reset token"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      ) : null}

      {mode === "reset" ? (
        <form onSubmit={onSubmitResetPassword} className="mt-8 space-y-5">
          <div className="rounded-md border border-[color-mix(in_srgb,var(--state-success)_24%,var(--border-default))] bg-[var(--state-success-soft)] px-3 py-2 text-xs font-medium text-[var(--state-success)]">
            Reset token sent. Check your email, then enter it below.
          </div>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Agent Email</span>
            <span className="relative mt-2 block">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
              />
              <input
                {...resetPasswordForm.register("email")}
                type="email"
                autoComplete="email"
                className={inputClassName}
                placeholder="agent@rokswood.com"
              />
            </span>
            {resetPasswordForm.formState.errors.email?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">
                {resetPasswordForm.formState.errors.email.message}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Reset Token</span>
            <span className="relative mt-2 block">
              <ShieldCheck
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
              />
              <input
                {...resetPasswordForm.register("token")}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                className={inputClassName}
                placeholder="Enter token"
              />
            </span>
            {resetPasswordForm.formState.errors.token?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">
                {resetPasswordForm.formState.errors.token.message}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--text-muted)]">New Password</span>
            <span className="relative mt-2 block">
              <LockKeyhole
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]"
              />
              <input
                {...resetPasswordForm.register("password")}
                type={resetPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
                className={inputClassName}
                placeholder="Create password"
              />
              <button
                type="button"
                aria-label={resetPasswordVisible ? "Hide password" : "Show password"}
                onClick={() => setResetPasswordVisible((current) => !current)}
                className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[var(--text-light)] transition-colors hover:bg-[var(--bg-tag)] hover:text-[var(--text-primary)]"
              >
                <Eye className="h-4 w-4" aria-hidden="true" />
              </button>
            </span>
            {resetPasswordForm.formState.errors.password?.message ? (
              <span className="mt-1 block text-xs text-[var(--state-error)]">
                {resetPasswordForm.formState.errors.password.message}
              </span>
            ) : null}
          </label>

          {resetPasswordForm.formState.errors.root?.message ? (
            <div className="rounded-md border border-[color-mix(in_srgb,var(--state-error)_30%,var(--border-default))] bg-[color-mix(in_srgb,var(--state-error)_7%,var(--bg-surface))] px-3 py-2 text-xs font-medium text-[var(--state-error)]">
              {resetPasswordForm.formState.errors.root.message}
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tag)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="submit"
              disabled={resetPassword.isPending}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {resetPassword.isPending ? "Resetting..." : "Reset password"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-6 rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4 text-xs text-[var(--text-muted)]">
        <p className="font-semibold text-[var(--text-primary)]">Need agent access?</p>
        <p className="mt-1 leading-5">
          Approved agents can sign in here. New partners should apply before requesting portal access.
        </p>
        <Link
          href="/agents"
          className="mt-3 inline-flex font-semibold text-[var(--accent-payment)] hover:underline"
        >
          Apply for access
        </Link>
      </div>
    </div>
  );
}
