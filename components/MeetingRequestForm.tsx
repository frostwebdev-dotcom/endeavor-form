"use client";

import { useState, FormEvent, useCallback } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

type FormState = "idle" | "submitting" | "success" | "error";

export type FormPayload = {
  preferredEmail: string;
  preferredPhone?: string;
  preferredDate?: string;
  preferredTime?: string;
  alternativeDate?: string;
  alternativeTime?: string;
  firmName?: string;
};

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function SuccessCheckIcon() {
  return (
    <svg
      className="h-8 w-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function MeetingRequestForm() {
  const [preferredEmail, setPreferredEmail] = useState("");
  const [preferredPhone, setPreferredPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [alternativeDate, setAlternativeDate] = useState("");
  const [alternativeTime, setAlternativeTime] = useState("");
  const [firmName, setFirmName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<FormPayload | null>(null);

  const validateEmail = useCallback((value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setEmailError("Please enter your email address.");
      return false;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError("Please enter a valid email address (e.g. name@company.com).");
      return false;
    }
    setEmailError("");
    return true;
  }, []);

  const validatePhone = useCallback((value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setPhoneError("");
      return true;
    }
    if (!isValidPhone(trimmed)) {
      setPhoneError("Please enter a valid phone number (e.g. 10–15 digits).");
      return false;
    }
    setPhoneError("");
    return true;
  }, []);

  const isEmailValid =
    preferredEmail.trim() !== "" && EMAIL_REGEX.test(preferredEmail.trim());
  const hasPhone = preferredPhone.trim() !== "";
  const isPhoneValid = !hasPhone || isValidPhone(preferredPhone.trim());
  const canSubmit =
    isEmailValid && isPhoneValid && formState !== "submitting";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(preferredEmail) || formState === "submitting") return;
    if (hasPhone && !validatePhone(preferredPhone)) return;

    setFormState("submitting");
    setMessage("");

    const payload: FormPayload = {
      preferredEmail: preferredEmail.trim(),
      preferredPhone: preferredPhone.trim() || undefined,
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime || undefined,
      alternativeDate: alternativeDate || undefined,
      alternativeTime: alternativeTime || undefined,
      firmName: firmName.trim() || undefined,
    };

    try {
      const res = await fetch("/api/meeting-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormState("error");
        setMessage(
          data.error ||
            "We couldn't send your request. Please try again in a moment."
        );
        return;
      }

      setFormState("success");
      setMessage(
        "Thank you. Your request is in our hands—we will follow up personally at the contact details you provided."
      );
      setSubmittedData(payload);
      setPreferredEmail("");
      setPreferredPhone("");
      setPreferredDate("");
      setPreferredTime("");
      setAlternativeDate("");
      setAlternativeTime("");
      setFirmName("");
      setEmailError("");
      setPhoneError("");
    } catch {
      setFormState("error");
      setMessage(
        "Something went wrong. Please check your connection and try again in a moment."
      );
    }
  };

  const isSubmitting = formState === "submitting";

  const inputBase =
    "w-full min-h-[48px] px-4 py-3 rounded-xl border border-zinc-200/95 dark:border-white/[0.12] bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-accent/50 dark:focus:border-crypto-cyan/40 focus:ring-2 focus:ring-accent/15 dark:focus:ring-crypto-cyan/20 focus:bg-white dark:focus:bg-white/[0.06] disabled:opacity-60 transition-all duration-200 text-base shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-none";
  const inputErrorClass =
    "border-red-400 focus:border-red-400 focus:ring-red-400/25";

  const labelClass =
    "block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5";
  const hintClass = "mt-1.5 text-xs text-zinc-500 dark:text-zinc-500 leading-snug";

  return (
    <section
      id="form"
      className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] overflow-hidden shadow-card dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)] scroll-mt-28 opacity-0 animate-fade-in-up-slow [animation-delay:120ms] [animation-fill-mode:forwards]"
      aria-labelledby="form-title"
    >
      <div className="h-1 bg-gradient-to-r from-accent/80 via-crypto-cyan/70 to-crypto-blue/80 dark:from-crypto-cyan/60 dark:via-crypto-blue/50 dark:to-crypto-purple/50" />
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 pb-8 border-b border-zinc-100 dark:border-white/[0.06]">
          <div>
            <h2
              id="form-title"
              className="font-serif text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight"
            >
              Meeting request
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Fields marked with an asterisk are required. Everything else helps
              us prepare for a focused first conversation.
            </p>
          </div>
          <div className="flex gap-3 rounded-xl border border-warm-200/80 dark:border-white/10 bg-warm-50/80 dark:bg-white/[0.04] px-4 py-3 sm:max-w-xs">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-white/[0.06] text-accent dark:text-crypto-cyan border border-warm-200/60 dark:border-white/10"
              aria-hidden
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Your privacy matters.
              </span>{" "}
              We use this information only to respond to your request and do
              not sell or share it for unrelated marketing.
            </p>
          </div>
        </div>

        {formState === "success" ? (
          <div role="status" aria-live="polite" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-500/25 bg-emerald-50/90 dark:bg-emerald-500/10 p-6 sm:p-8">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-cta shadow-soft"
                aria-hidden
              >
                <SuccessCheckIcon />
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                  Request received
                </p>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
            {submittedData && (
              <div
                className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/90 dark:bg-white/[0.04] p-5 sm:p-6 text-sm text-zinc-700 dark:text-zinc-300 space-y-2"
                aria-label="Summary of your submission"
              >
                <p className="font-semibold text-zinc-900 dark:text-white text-base mb-3">
                  What you sent
                </p>
                <p>
                  <span className="text-zinc-500 dark:text-zinc-500">Email</span>{" "}
                  <span className="font-medium">{submittedData.preferredEmail}</span>
                </p>
                {submittedData.preferredPhone && (
                  <p>
                    <span className="text-zinc-500 dark:text-zinc-500">Phone</span>{" "}
                    <span className="font-medium">{submittedData.preferredPhone}</span>
                  </p>
                )}
                {(submittedData.preferredDate || submittedData.preferredTime) && (
                  <p>
                    <span className="text-zinc-500">Preferred</span>{" "}
                    {[submittedData.preferredDate, submittedData.preferredTime]
                      .filter(Boolean)
                      .join(" at ") || "—"}
                  </p>
                )}
                {(submittedData.alternativeDate ||
                  submittedData.alternativeTime) && (
                  <p>
                    <span className="text-zinc-500">Alternative</span>{" "}
                    {[
                      submittedData.alternativeDate,
                      submittedData.alternativeTime,
                    ]
                      .filter(Boolean)
                      .join(" at ") || "—"}
                  </p>
                )}
                {submittedData.firmName && (
                  <p>
                    <span className="text-zinc-500 dark:text-zinc-500">Name</span>{" "}
                    <span className="font-medium">{submittedData.firmName}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-7"
            noValidate
            aria-describedby={emailError ? "email-error" : undefined}
          >
            {formState === "error" && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/30 text-red-800 dark:text-red-300 text-sm leading-relaxed"
                aria-live="assertive"
              >
                {message}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="preferredEmail" className={labelClass}>
                  Work or preferred email{" "}
                  <span className="text-red-500 dark:text-red-400" aria-hidden>
                    *
                  </span>
                </label>
                <input
                  id="preferredEmail"
                  type="email"
                  value={preferredEmail}
                  onChange={(e) => {
                    setPreferredEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={() => preferredEmail && validateEmail(preferredEmail)}
                  placeholder="name@company.com"
                  required
                  disabled={isSubmitting}
                  className={`${inputBase} ${emailError ? inputErrorClass : ""}`}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                <p id="email-hint" className={hintClass}>
                  We will use this to confirm your request and follow up.
                </p>
                {emailError && (
                  <p
                    id="email-error"
                    className="mt-1.5 text-sm text-red-500 dark:text-red-400 font-medium"
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="preferredPhone" className={labelClass}>
                  Phone <span className="font-normal text-zinc-500">(optional)</span>
                </label>
                <input
                  id="preferredPhone"
                  type="tel"
                  value={preferredPhone}
                  onChange={(e) => {
                    setPreferredPhone(e.target.value);
                    if (phoneError) validatePhone(e.target.value);
                  }}
                  onBlur={() => preferredPhone && validatePhone(preferredPhone)}
                  placeholder="Best number to reach you"
                  disabled={isSubmitting}
                  className={`${inputBase} ${phoneError ? inputErrorClass : ""}`}
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                <p className={hintClass}>
                  Optional but helpful if you prefer a call for scheduling.
                </p>
                {phoneError && (
                  <p
                    id="phone-error"
                    className="mt-1.5 text-sm text-red-500 dark:text-red-400 font-medium"
                    role="alert"
                  >
                    {phoneError}
                  </p>
                )}
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className={labelClass}>Preferred date &amp; time</legend>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 -mt-1 mb-1">
                Suggest when you are usually available; we will confirm or propose alternatives.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  >
                    <CalendarIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </span>
                  <input
                    id="preferredDate"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    disabled={isSubmitting}
                    className={`${inputBase} pl-10 [color-scheme:dark]`}
                    aria-label="Preferred date"
                  />
                </div>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  >
                    <ClockIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </span>
                  <input
                    id="preferredTime"
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    disabled={isSubmitting}
                    className={`${inputBase} pl-10 [color-scheme:dark]`}
                    aria-label="Preferred time"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className={labelClass}>
                Alternative date &amp; time{" "}
                <span className="font-normal text-zinc-500">(optional)</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  >
                    <CalendarIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </span>
                  <input
                    id="alternativeDate"
                    type="date"
                    value={alternativeDate}
                    onChange={(e) => setAlternativeDate(e.target.value)}
                    disabled={isSubmitting}
                    className={`${inputBase} pl-10 [color-scheme:dark]`}
                    aria-label="Alternative date"
                  />
                </div>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden
                  >
                    <ClockIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </span>
                  <input
                    id="alternativeTime"
                    type="time"
                    value={alternativeTime}
                    onChange={(e) => setAlternativeTime(e.target.value)}
                    disabled={isSubmitting}
                    className={`${inputBase} pl-10 [color-scheme:dark]`}
                    aria-label="Alternative time"
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <label htmlFor="firmName" className={labelClass}>
                Your name <span className="font-normal text-zinc-500">(optional)</span>
              </label>
              <input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="How you would like us to address you"
                disabled={isSubmitting}
                className={inputBase}
                autoComplete="name"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full min-h-[52px] py-3.5 px-6 rounded-full font-semibold text-white bg-gradient-cta hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 shadow-soft dark:shadow-glow text-base tracking-tight"
                aria-busy={isSubmitting}
                aria-disabled={!canSubmit}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Spinner />
                    Sending your request…
                  </span>
                ) : (
                  "Submit meeting request"
                )}
              </button>
              <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-500">
                By submitting, you agree we may contact you regarding this
                request. You can reach us anytime at{" "}
                <a
                  href="mailto:hello@infoendeavorconnect.com"
                  className="text-accent dark:text-crypto-cyan hover:underline"
                >
                  hello@infoendeavorconnect.com
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
