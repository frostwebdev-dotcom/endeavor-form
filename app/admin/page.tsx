"use client";

import type { MeetingRequestRow } from "@/app/api/admin/meeting-requests/route";
import { useCallback, useEffect, useRef, useState } from "react";

const POLL_INTERVAL_MS = 20_000;
const STORAGE_KEY = "admin_secret";

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const play = (frequency: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = frequency;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
      osc.start(start);
      osc.stop(start + duration);
    };
    play(600, 0, 0.12);
    play(900, 0.15, 0.2);
  } catch {
    // Fallback: no sound if AudioContext not allowed (e.g. autoplay policy)
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function DashTable({
  rows,
  highlightIds,
}: {
  rows: MeetingRequestRow[];
  highlightIds: Set<string>;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
        No meeting requests yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50">
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Email
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Phone
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Preferred date
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Preferred time
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Alt. date
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Alt. time
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Name
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Submitted
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isNew = highlightIds.has(row.id);
            return (
              <tr
                key={row.id}
                className={`border-b border-zinc-100 dark:border-white/5 transition-colors ${
                  isNew
                    ? "bg-crypto-cyan/10 dark:bg-crypto-cyan/15 border-l-4 border-l-crypto-cyan"
                    : "bg-white dark:bg-transparent"
                }`}
              >
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">
                  <a
                    href={`mailto:${row.preferred_email}`}
                    className="text-crypto-cyan hover:underline"
                  >
                    {row.preferred_email}
                  </a>
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {row.preferred_phone ?? "—"}
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {row.preferred_date ?? "—"}
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {row.preferred_time ?? "—"}
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {row.alternative_date ?? "—"}
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {row.alternative_time ?? "—"}
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {row.firm_name ?? "—"}
                </td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                  {formatDate(row.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CardList({
  rows,
  highlightIds,
}: {
  rows: MeetingRequestRow[];
  highlightIds: Set<string>;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
        No meeting requests yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const isNew = highlightIds.has(row.id);
        return (
          <div
            key={row.id}
            className={`rounded-xl border p-4 transition-colors ${
              isNew
                ? "border-crypto-cyan bg-crypto-cyan/10 dark:bg-crypto-cyan/15"
                : "border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03]"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <a
                href={`mailto:${row.preferred_email}`}
                className="font-medium text-crypto-cyan hover:underline"
              >
                {row.preferred_email}
              </a>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatDate(row.created_at)}
              </span>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Phone</dt>
                <dd className="text-zinc-900 dark:text-white">
                  {row.preferred_phone ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Name</dt>
                <dd className="text-zinc-900 dark:text-white">
                  {row.firm_name ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Preferred date / time
                </dt>
                <dd className="text-zinc-900 dark:text-white">
                  {[row.preferred_date, row.preferred_time]
                    .filter(Boolean)
                    .join(" at ") || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Alternative date / time
                </dt>
                <dd className="text-zinc-900 dark:text-white">
                  {[row.alternative_date, row.alternative_time]
                    .filter(Boolean)
                    .join(" at ") || "—"}
                </dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [secret, setSecret] = useState("");
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState<MeetingRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const seenIdsRef = useRef<Set<string>>(new Set());
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const isInitialLoadRef = useRef(true);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchWithAuth = useCallback(
    async (adminSecret: string): Promise<MeetingRequestRow[]> => {
      const res = await fetch("/api/admin/meeting-requests", {
        headers: {
          Authorization: `Bearer ${adminSecret}`,
        },
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Request failed");
      }
      return res.json();
    },
    []
  );

  const loadData = useCallback(
    async (adminSecret: string, isInitial: boolean) => {
      try {
        if (isInitial) setLoading(true);
        setFetchError("");
        const list = await fetchWithAuth(adminSecret);
        setData(list);

        const currentIds = new Set(list.map((r) => r.id));
        const prevSeen = seenIdsRef.current;
        const newIds = Array.from(currentIds).filter((id) => !prevSeen.has(id));

        if (newIds.length > 0 && !isInitial) {
          playNotificationSound();
          setHighlightIds((h) => {
            const next = new Set(Array.from(h));
            newIds.forEach((id) => next.add(id));
            return next;
          });
        }

        seenIdsRef.current = currentIds;
        isInitialLoadRef.current = false;
      } catch (e) {
        setFetchError(e instanceof Error ? e.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth]
  );

  // Check stored secret on mount and start polling when authenticated
  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      fetchWithAuth(stored)
        .then((list) => {
          setAuthenticated(true);
          setData(list);
          seenIdsRef.current = new Set(list.map((r) => r.id));
          setLoading(false);
        })
        .catch(() => {
          sessionStorage.removeItem(STORAGE_KEY);
          setAuthenticated(false);
          setLoading(false);
        });
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, [fetchWithAuth]);

  useEffect(() => {
    if (!authenticated) return;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const tick = () => loadData(stored, false);
    pollRef.current = setInterval(tick, POLL_INTERVAL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [authenticated, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const s = secret.trim();
    if (!s) {
      setLoginError("Please enter the admin secret.");
      return;
    }
    try {
      await fetchWithAuth(s);
      sessionStorage.setItem(STORAGE_KEY, s);
      setAuthenticated(true);
      loadData(s, true);
    } catch {
      setLoginError("Invalid admin secret.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
    setData([]);
    seenIdsRef.current = new Set();
    setHighlightIds(new Set());
    setSecret("");
  };

  if (authenticated === null || (authenticated && loading && data.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-warm dark:bg-[#0a0a0f] p-4">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
          Loading…
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-warm dark:bg-[#0a0a0f] p-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-lg">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Admin sign in
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Enter the admin secret to view meeting requests.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-secret"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                Admin secret
              </label>
              <input
                id="admin-secret"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full min-h-[44px] px-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-crypto-cyan focus:border-crypto-cyan"
                placeholder="Secret"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-500" role="alert">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full min-h-[44px] py-2 rounded-full font-semibold text-white bg-gradient-cta hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-crypto-cyan"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-warm dark:bg-[#0a0a0f] text-zinc-800 dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
              Admin — Meeting requests
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              All customer submissions. New entries are highlighted and trigger a
              notification sound.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Auto-refresh every {POLL_INTERVAL_MS / 1000}s
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/10 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        {fetchError && (
          <div
            className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 text-sm"
            role="alert"
          >
            {fetchError}
          </div>
        )}

        {loading && data.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400 py-8">Loading…</p>
        ) : (
          <>
            <div className="hidden md:block">
              <DashTable rows={data} highlightIds={highlightIds} />
            </div>
            <div className="md:hidden">
              <CardList rows={data} highlightIds={highlightIds} />
            </div>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              {data.length} request{data.length !== 1 ? "s" : ""} total
              {highlightIds.size > 0 &&
                ` · ${highlightIds.size} new since you opened this page`}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
