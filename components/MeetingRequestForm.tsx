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
      setPhoneError("Please enter a valid phone number (10 to 15 digits).");
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
    "w-full min-h-[48px] px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none disabled:opacity-60 transition-colors text-base [color-scheme:light]";
  const inputError =
    "border-red-500 focus:border-red-500";
  const labelClass =
    "block text-[0.95rem] font-semibold text-slate-800 mb-2";
  const hintClass = "mt-2 text-sm text-slate-500 leading-snug";

  return (
    <section
      id="form"
      className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-card scroll-mt-28"
      aria-labelledby="form-title"
    >
      <div className="h-1.5 bg-gradient-cta" aria-hidden />
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="mb-8 pb-6 border-b border-slate-100">
          <h2
            id="form-title"
            className="font-serif text-2xl sm:text-[1.65rem] font-semibold text-slate-900 tracking-tight"
          >
            Meeting request
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Fields marked with an asterisk are required. Everything else helps
            us prepare for a focused first conversation.
          </p>
          <p className="mt-4 text-sm text-slate-600 flex items-start gap-2">
            <svg
              className="h-5 w-5 shrink-0 text-brand-700 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>
              <span className="font-semibold text-slate-800">
                Your privacy matters.
              </span>{" "}
              We use this information only to respond to your request and do
              not sell or share it for unrelated marketing.
            </span>
          </p>
        </div>

        {formState === "success" ? (
          <div role="status" aria-live="polite" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-cta shadow-soft"
                aria-hidden
              >
                <SuccessCheckIcon />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-slate-900">
                  Request received
                </p>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
            {submittedData && (
              <div
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 text-slate-700 space-y-2"
                aria-label="Summary of your submission"
              >
                <p className="font-semibold text-slate-900 text-base mb-3">
                  What you sent
                </p>
                <p>
                  <span className="text-slate-500">Email</span>{" "}
                  <span className="font-medium">
                    {submittedData.preferredEmail}
                  </span>
                </p>
                {submittedData.preferredPhone && (
                  <p>
                    <span className="text-slate-500">Phone</span>{" "}
                    <span className="font-medium">
                      {submittedData.preferredPhone}
                    </span>
                  </p>
                )}
                {(submittedData.preferredDate || submittedData.preferredTime) && (
                  <p>
                    <span className="text-slate-500">Preferred</span>{" "}
                    {[submittedData.preferredDate, submittedData.preferredTime]
                      .filter(Boolean)
                      .join(" at ") || "—"}
                  </p>
                )}
                {(submittedData.alternativeDate ||
                  submittedData.alternativeTime) && (
                  <p>
                    <span className="text-slate-500">Alternative</span>{" "}
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
                    <span className="text-slate-500">Name</span>{" "}
                    <span className="font-medium">
                      {submittedData.firmName}
                    </span>
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
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm leading-relaxed"
                aria-live="assertive"
              >
                {message}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="preferredEmail" className={labelClass}>
                  Work or preferred email{" "}
                  <span className="text-red-600" aria-hidden>
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
                  className={`${inputBase} ${emailError ? inputError : ""}`}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!emailError}
                  aria-describedby={
                    emailError ? "email-error" : "email-hint"
                  }
                />
                {emailError ? (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-700 font-medium"
                    role="alert"
                  >
                    {emailError}
                  </p>
                ) : (
                  <p id="email-hint" className={hintClass}>
                    We'll use this to confirm your request and follow up.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="preferredPhone" className={labelClass}>
                  Phone{" "}
                  <span className="font-normal text-slate-500">(optional)</span>
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
                  className={`${inputBase} ${phoneError ? inputError : ""}`}
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  aria-describedby={
                    phoneError ? "phone-error" : "phone-hint"
                  }
                />
                {phoneError ? (
                  <p
                    id="phone-error"
                    className="mt-2 text-sm text-red-700 font-medium"
                    role="alert"
                  >
                    {phoneError}
                  </p>
                ) : (
                  <p id="phone-hint" className={hintClass}>
                    Optional but helpful if you prefer a call for scheduling.
                  </p>
                )}
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className={labelClass}>Preferred date &amp; time</legend>
              <p className="text-sm text-slate-500 -mt-1 mb-2">
                Suggest when you're usually available; we'll confirm or
                propose alternatives.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="sr-only"
                  >
                    Preferred date
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    disabled={isSubmitting}
                    className={inputBase}
                    aria-label="Preferred date"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="sr-only">
                    Preferred time
                  </label>
                  <input
                    id="preferredTime"
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    disabled={isSubmitting}
                    className={inputBase}
                    aria-label="Preferred time"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className={labelClass}>
                Alternative date &amp; time{" "}
                <span className="font-normal text-slate-500">(optional)</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="alternativeDate" className="sr-only">
                    Alternative date
                  </label>
                  <input
                    id="alternativeDate"
                    type="date"
                    value={alternativeDate}
                    onChange={(e) => setAlternativeDate(e.target.value)}
                    disabled={isSubmitting}
                    className={inputBase}
                    aria-label="Alternative date"
                  />
                </div>
                <div>
                  <label htmlFor="alternativeTime" className="sr-only">
                    Alternative time
                  </label>
                  <input
                    id="alternativeTime"
                    type="time"
                    value={alternativeTime}
                    onChange={(e) => setAlternativeTime(e.target.value)}
                    disabled={isSubmitting}
                    className={inputBase}
                    aria-label="Alternative time"
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <label htmlFor="firmName" className={labelClass}>
                Your name or firm{" "}
                <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="How should we address you?"
                disabled={isSubmitting}
                className={inputBase}
                autoComplete="name"
              />
              <p className={hintClass}>
                Optional. Share as much or as little as you'd like.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-md text-base font-semibold text-white bg-gradient-cta shadow-soft hover:brightness-[1.05] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  <>
                    Send my request
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
              <p className="mt-3 text-sm text-slate-500">
                We typically respond within one business day.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
