"use client";

import { useState, FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = "idle" | "submitting" | "success" | "error";

export default function MeetingRequestPage() {
  const [preferredEmail, setPreferredEmail] = useState("");
  const [preferredPhone, setPreferredPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [alternativeDate, setAlternativeDate] = useState("");
  const [alternativeTime, setAlternativeTime] = useState("");
  const [firmName, setFirmName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    if (!EMAIL_REGEX.test(value.trim())) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(preferredEmail)) return;
    if (formState === "submitting") return;

    setFormState("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/meeting-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredEmail: preferredEmail.trim(),
          preferredPhone: preferredPhone.trim() || undefined,
          preferredDate: preferredDate || undefined,
          preferredTime: preferredTime || undefined,
          alternativeDate: alternativeDate || undefined,
          alternativeTime: alternativeTime || undefined,
          firmName: firmName.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormState("error");
        setMessage(
          data.error || data.message || "Something went wrong. Please try again."
        );
        return;
      }

      setFormState("success");
      setMessage("Thank you! We've received your request and will be in touch soon.");
      setPreferredEmail("");
      setPreferredPhone("");
      setPreferredDate("");
      setPreferredTime("");
      setAlternativeDate("");
      setAlternativeTime("");
      setFirmName("");
      setEmailError("");
    } catch {
      setFormState("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  const isSubmitting = formState === "submitting";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Get In Touch
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
            We&apos;d love to hear from you. Share your details below and we&apos;ll
            get back to you to schedule a meeting.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Email (required) */}
            <div>
              <label
                htmlFor="preferredEmail"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email <span className="text-red-500">*</span>
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
                placeholder="you@example.com"
                required
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50/50 focus:bg-white ${
                  emailError
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20"
                } focus:ring-2 placeholder:text-gray-400 text-gray-900 disabled:opacity-60`}
                autoComplete="email"
              />
              {emailError && (
                <p className="mt-1.5 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="preferredPhone"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Phone
              </label>
              <input
                id="preferredPhone"
                type="tel"
                value={preferredPhone}
                onChange={(e) => setPreferredPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder:text-gray-400 text-gray-900 disabled:opacity-60"
                autoComplete="tel"
              />
            </div>

            {/* Preferred date & time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Preferred date
                </label>
                <input
                  id="preferredDate"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-gray-900 disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Preferred time
                </label>
                <input
                  id="preferredTime"
                  type="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-gray-900 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Alternative date & time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="alternativeDate"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Alternative date
                </label>
                <input
                  id="alternativeDate"
                  type="date"
                  value={alternativeDate}
                  onChange={(e) => setAlternativeDate(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-gray-900 disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="alternativeTime"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Alternative time
                </label>
                <input
                  id="alternativeTime"
                  type="time"
                  value={alternativeTime}
                  onChange={(e) => setAlternativeTime(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-gray-900 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Firm name */}
            <div>
              <label
                htmlFor="firmName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Firm / company name
              </label>
              <input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Your firm or company"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder:text-gray-400 text-gray-900 disabled:opacity-60"
                autoComplete="organization"
              />
            </div>

            {/* Success / Error message */}
            {message && (
              <div
                role="alert"
                className={`p-4 rounded-lg ${
                  formState === "success"
                    ? "bg-brand-50 text-brand-800 border border-brand-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-lg font-semibold text-white bg-brand-600 hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
                    Sending…
                  </span>
                ) : (
                  "Send request"
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          infoendeavorconnect.com
        </p>
      </div>
    </div>
  );
}
