"use client";

import { useState, FormEvent, useCallback } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: digits only, 10–15 length (allows international)
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
      setMessage("Thank you! We've received your request and will be in touch soon.");
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
    "w-full min-h-[44px] sm:min-h-[48px] px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.05] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-crypto-cyan/60 focus:ring-2 focus:ring-crypto-cyan/20 focus:bg-white dark:focus:bg-white/[0.08] disabled:opacity-60 transition-all duration-200 text-base";
  const inputErrorClass =
    "border-red-400 focus:border-red-400 focus:ring-red-400/30";

  return (
    <section
      id="form"
      className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-card dark:shadow-glow transition-colors duration-200"
      aria-labelledby="form-title"
    >
      <div className="p-6 sm:p-8 lg:p-10">
        <h2
          id="form-title"
          className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-6"
        >
          Get In Touch
        </h2>

        {formState === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="space-y-4"
          >
            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
              {message}
            </p>
            {submittedData && (
              <div
                className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/[0.08] text-sm text-zinc-700 dark:text-zinc-300 space-y-1"
                aria-label="Summary of your submission"
              >
                <p className="font-medium text-zinc-900 dark:text-white mb-2">Summary</p>
                <p>
                  <span className="text-zinc-500 dark:text-zinc-500">Email:</span>{" "}
                  {submittedData.preferredEmail}
                </p>
                {submittedData.preferredPhone && (
                  <p>
                    <span className="text-zinc-500 dark:text-zinc-500">Phone:</span>{" "}
                    {submittedData.preferredPhone}
                  </p>
                )}
                {(submittedData.preferredDate || submittedData.preferredTime) && (
                  <p>
                    <span className="text-zinc-500">Preferred:</span>{" "}
                    {[submittedData.preferredDate, submittedData.preferredTime]
                      .filter(Boolean)
                      .join(" at ") || "—"}
                  </p>
                )}
                {(submittedData.alternativeDate ||
                  submittedData.alternativeTime) && (
                  <p>
                    <span className="text-zinc-500">Alternative:</span>{" "}
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
                    <span className="text-zinc-500">Firm:</span>{" "}
                    {submittedData.firmName}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            aria-describedby={emailError ? "email-error" : undefined}
          >
            {formState === "error" && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/30 text-red-700 dark:text-red-300 text-sm"
                aria-live="assertive"
              >
                {message}
              </div>
            )}

            {/* Email (required) + Phone */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label
                  htmlFor="preferredEmail"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Preferred Email <span className="text-red-400" aria-hidden>*</span>
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
                  placeholder="e.g. jane@company.com"
                  required
                  disabled={isSubmitting}
                  className={`${inputBase} ${emailError ? inputErrorClass : ""}`}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError && (
                  <p
                    id="email-error"
                    className="mt-1.5 text-sm text-red-400 font-medium"
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="preferredPhone"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Preferred Phone
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
                  placeholder="e.g. (555) 123-4567"
                  disabled={isSubmitting}
                  className={`${inputBase} ${phoneError ? inputErrorClass : ""}`}
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError && (
                  <p
                    id="phone-error"
                    className="mt-1.5 text-sm text-red-400 font-medium"
                    role="alert"
                  >
                    {phoneError}
                  </p>
                )}
              </div>
            </div>

            {/* Preferred Date + Time */}
            <div>
              <fieldset className="space-y-2">
                <legend className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Preferred Date & Time
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                      aria-hidden
                    >
                      <CalendarIcon />
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                      aria-hidden
                    >
                      <ClockIcon />
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
            </div>

            {/* Alternative Date + Time */}
            <div>
              <fieldset className="space-y-2">
                <legend className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Alternative Date & Time
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                      aria-hidden
                    >
                      <CalendarIcon />
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                      aria-hidden
                    >
                      <ClockIcon />
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
            </div>

            {/* Firm Name */}
            <div>
                <label
                  htmlFor="firmName"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                Firm Name
              </label>
              <input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="e.g. Explore meeting with LPL Financial"
                disabled={isSubmitting}
                className={inputBase}
                autoComplete="organization"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full min-h-[48px] sm:min-h-[52px] py-3 px-6 rounded-full font-semibold text-white bg-gradient-cta hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-glow hover:shadow-glow-lg text-base"
                aria-busy={isSubmitting}
                aria-disabled={!canSubmit}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Spinner />
                    Submitting…
                  </span>
                ) : (
                  "Submit Meeting Request"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
