"use client";

import { useEffect, useState } from "react";

import { toLocaleDigits, type Locale } from "@/lib/i18n";

/**
 * Local time where the work happens. Real information, not chrome — someone
 * reading the site knows whether it is a reasonable hour to call.
 */
export function LocalTime({ locale }: { locale: Locale }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(toLocaleDigits(now, locale));
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  /* Nothing until the client resolves the timezone, so server and client
     markup match and the number never renders wrong for a moment. */
  if (!time) return <span aria-hidden="true" className="inline-block h-4 w-11" />;

  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className="status-dot-live h-1.5 w-1.5 rounded-full bg-signal" />
      <time className="latin font-mono text-sm tabular-nums text-chalk">{time}</time>
    </span>
  );
}
