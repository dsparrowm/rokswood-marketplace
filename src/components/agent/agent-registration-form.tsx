"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { ChevronDown, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAgentRegistrationRequestMutation } from "@/lib/hooks/use-agent-registration-request";

const agentRegistrationSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    countryCode: z.string().min(2, "Select a country"),
    businessName: z.string().optional(),
    businessType: z.string().min(2, "Select a business type"),
    yearsOfExperience: z.string().min(1, "Select years of experience"),
    preferredProductCategory: z.string().min(2, "Select a category"),
    preferredStoreLocation: z.string().min(2, "Enter a preferred location"),
    targetMarketRegion: z.string().min(2, "Enter a target region"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    acceptedTerms: z.boolean().refine((value) => value, "Accept the agent terms to continue"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type AgentRegistrationValues = z.infer<typeof agentRegistrationSchema>;

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[var(--text-muted)]">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-[var(--state-error)]">{error}</span> : null}
    </label>
  );
}

type SectionHeaderProps = {
  step: number;
  title: string;
};

function SectionHeader({ step, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-tag)] text-xs font-bold text-[var(--text-muted)]">
        {step}
      </span>
      <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
    </div>
  );
}

const inputClassName =
  "mt-2 h-11 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-light)] focus:border-[var(--accent-payment)]";

const selectClassName = `${inputClassName} appearance-none pr-10`;

export default function AgentRegistrationForm() {
  const agentRegistrationRequest = useAgentRegistrationRequestMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentRegistrationValues>({
    resolver: zodResolver(agentRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      countryCode: "",
      businessName: "",
      businessType: "",
      yearsOfExperience: "",
      preferredProductCategory: "",
      preferredStoreLocation: "",
      targetMarketRegion: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit((values) => {
    agentRegistrationRequest.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        countryCode: values.countryCode,
        businessName: values.businessName || undefined,
        businessType: values.businessType,
        yearsOfExperience: values.yearsOfExperience,
        preferredProductCategory: values.preferredProductCategory,
        preferredStoreLocation: values.preferredStoreLocation,
        targetMarketRegion: values.targetMarketRegion,
        password: values.password,
        termsAccepted: true,
        policyAccepted: true,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  });

  return (
    <section id="agent-registration" className="bg-[var(--bg-surface)] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Agent Registration
          </h2>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
            Complete the form below to initiate your enterprise partner onboarding.
          </p>
        </div>

        {agentRegistrationRequest.isSuccess ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-[var(--state-success)] bg-[color-mix(in_srgb,var(--state-success)_8%,var(--bg-surface))] px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
            Agent registration submitted. A Rokswood partner manager will review the application.
          </div>
        ) : null}

        {agentRegistrationRequest.isError ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-[var(--state-error)] bg-[color-mix(in_srgb,var(--state-error)_8%,var(--bg-surface))] px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
            {agentRegistrationRequest.error.message}
          </div>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-2xl rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-[0_20px_50px_color-mix(in_srgb,var(--bg-dark)_10%,transparent)] sm:p-8 lg:p-10"
        >
          <div className="space-y-10">
            <section>
              <SectionHeader step={1} title="Personal Information" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input {...register("fullName")} className={inputClassName} autoComplete="name" />
                </Field>
                <Field label="Email Address" error={errors.email?.message}>
                  <input {...register("email")} type="email" className={inputClassName} autoComplete="email" />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <input {...register("phone")} className={inputClassName} autoComplete="tel" />
                </Field>
                <Field label="Country" error={errors.countryCode?.message}>
                  <div className="relative">
                    <select {...register("countryCode")} className={selectClassName} autoComplete="country">
                      <option value="">Select Country</option>
                      <option value="NG">Nigeria</option>
                      <option value="GH">Ghana</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
                  </div>
                </Field>
              </div>
            </section>

            <section>
              <SectionHeader step={2} title="Business Information" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Business Name (Optional)" error={errors.businessName?.message}>
                    <input {...register("businessName")} className={inputClassName} />
                  </Field>
                </div>
                <Field label="Business Type" error={errors.businessType?.message}>
                  <div className="relative">
                    <select {...register("businessType")} className={selectClassName}>
                      <option value="">Select Type</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Procurement Consultant">Procurement Consultant</option>
                      <option value="Regional Supplier">Regional Supplier</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
                  </div>
                </Field>
                <Field label="Years of Experience" error={errors.yearsOfExperience?.message}>
                  <div className="relative">
                    <select {...register("yearsOfExperience")} className={selectClassName}>
                      <option value="">Select Experience</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="4-7 years">4-7 years</option>
                      <option value="8+ years">8+ years</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
                  </div>
                </Field>
              </div>
            </section>

            <section>
              <SectionHeader step={3} title="Agent Preferences" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Preferred Product Category" error={errors.preferredProductCategory?.message}>
                  <div className="relative">
                    <select {...register("preferredProductCategory")} className={selectClassName}>
                      <option value="">Select Category</option>
                      <option value="Industrial Equipment">Industrial Equipment</option>
                      <option value="Energy Systems">Energy Systems</option>
                      <option value="Agricultural Technology">Agricultural Technology</option>
                      <option value="Fabrication Components">Fabrication Components</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
                  </div>
                </Field>
                <Field label="Preferred Store Location" error={errors.preferredStoreLocation?.message}>
                  <input {...register("preferredStoreLocation")} className={inputClassName} placeholder="e.g. Lagos Central" />
                </Field>
                <Field label="Target Market Region" error={errors.targetMarketRegion?.message}>
                  <input {...register("targetMarketRegion")} className={inputClassName} placeholder="e.g. South West" />
                </Field>
              </div>
            </section>

            <section className="border-t border-[var(--border-default)] pt-8">
              <SectionHeader step={4} title="Account Setup" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Password" error={errors.password?.message}>
                  <input {...register("password")} type="password" className={inputClassName} autoComplete="new-password" />
                </Field>
                <Field label="Confirm Password" error={errors.confirmPassword?.message}>
                  <input {...register("confirmPassword")} type="password" className={inputClassName} autoComplete="new-password" />
                </Field>
              </div>
            </section>
          </div>

          <label className="mt-8 flex items-start gap-3 text-xs leading-5 text-[var(--text-muted)]">
            <input
              {...register("acceptedTerms")}
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-[var(--border-default)] accent-[var(--accent-payment)]"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-[var(--accent-payment)] hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              and the official{" "}
              <Link href="/privacy" className="font-semibold text-[var(--accent-payment)] hover:underline">
                Rokswood Agent Policy Agreement
              </Link>
              {errors.acceptedTerms?.message ? (
                <span className="mt-1 block text-[var(--state-error)]">{errors.acceptedTerms.message}</span>
              ) : null}
            </span>
          </label>

          <button
            type="submit"
            disabled={agentRegistrationRequest.isPending}
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-[var(--accent-payment)] px-5 text-sm font-semibold text-[var(--text-on-dark)] shadow-lg shadow-[color-mix(in_srgb,var(--accent-payment)_24%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent-payment)_88%,var(--bg-dark))]"
          >
            {agentRegistrationRequest.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting
              </>
            ) : (
              "Become an Agent"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
