"use client";

import { useState, type FormEvent } from "react";

import type { Content } from "@/lib/content";
import { Reveal } from "./ui/reveal";

type Status = "idle" | "sending" | "sent" | "error";

const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

export function Contact({ c }: { c: Content }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      from_name: String(data.get("from_name") ?? "").trim(),
      from_email: String(data.get("from_email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const found: Record<string, string> = {};
    if (!values.from_name) found.from_name = c.contact.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.from_email)) {
      found.from_email = c.contact.errors.email;
    }
    if (!values.subject) found.subject = c.contact.errors.subject;
    if (values.message.length < 10) found.message = c.contact.errors.message;

    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      setStatus("error");
      setSendError(c.contact.errors.config);
      return;
    }

    setStatus("sending");
    setSendError(null);

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, values, {
        publicKey: EMAILJS.publicKey,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setSendError(c.contact.errors.send);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32" aria-label={c.contact.title}>
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Reach me directly */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label flex items-center gap-3 text-signal">
                <span aria-hidden="true" className="h-px w-8 bg-signal/45" />
                {c.contact.eyebrow}
              </p>
              <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold">
                {c.contact.title}
              </h2>
              <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-slate">
                {c.contact.lede}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-9 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
                {c.contact.links.map((link) => {
                  const Tag = link.href ? "a" : "div";
                  return (
                    <li key={link.id}>
                      <Tag
                        {...(link.href
                          ? {
                              href: link.href,
                              ...(link.href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {}),
                            }
                          : {})}
                        className={`flex items-center justify-between gap-4 bg-ink-2 px-5 py-4 transition-colors duration-200 ${
                          link.href ? "group hover:bg-signal/[0.045]" : ""
                        }`}
                      >
                        <span>
                          <span className="label block text-slate-dim">{link.label}</span>
                          <span
                            dir={link.id === "email" || link.id === "linkedin" ? "ltr" : undefined}
                            className="mt-1.5 block text-[0.95rem] text-chalk group-hover:text-signal"
                          >
                            {link.value}
                          </span>
                        </span>
                        {link.href ? (
                          <span
                            aria-hidden="true"
                            className="text-slate-dim transition-colors duration-200 group-hover:text-signal"
                          >
                            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                              <path
                                d="M3.5 11.5L11.5 3.5M11.5 3.5H5.5M11.5 3.5V9.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={180} className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-9">
              <h3 className="font-display text-2xl font-bold">{c.contact.formTitle}</h3>
              <p className="mt-2 text-sm text-slate">{c.contact.formLede}</p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    name="from_name"
                    label={c.contact.fields.name}
                    autoComplete="name"
                    error={errors.from_name}
                  />
                  <Field
                    name="from_email"
                    type="email"
                    label={c.contact.fields.email}
                    autoComplete="email"
                    dir="ltr"
                    error={errors.from_email}
                  />
                </div>

                <Field name="subject" label={c.contact.fields.subject} error={errors.subject} />

                <Field
                  name="message"
                  label={c.contact.fields.message}
                  textarea
                  error={errors.message}
                />

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    suppressHydrationWarning
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2.5 rounded-full bg-signal px-7 py-3.5 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === "sending"
                      ? c.contact.sending
                      : status === "sent"
                        ? c.contact.sent
                        : c.contact.send}
                    {status === "sending" ? (
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"
                      />
                    ) : status === "sent" ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </button>

                  <p aria-live="polite" className="text-sm">
                    {status === "sent" ? (
                      <span className="text-signal">{c.contact.sentNote}</span>
                    ) : sendError ? (
                      <span className="text-amber">{sendError}</span>
                    ) : null}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea = false,
  error,
  autoComplete,
  dir,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  autoComplete?: string;
  dir?: "ltr" | "rtl";
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  const shared = {
    id,
    name,
    dir,
    autoComplete,
    /* Password managers and form fillers stamp their own attributes onto form
       controls before hydration; React reads that as a mismatch. This opts out
       of the attribute check for this element only. */
    suppressHydrationWarning: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `w-full rounded-xl border bg-ink-3 px-4 py-3 text-chalk placeholder:text-slate-dim/70 transition-colors duration-200 focus:outline-none focus-visible:border-signal ${
      error ? "border-amber/60" : "border-line"
    }`,
  };

  return (
    <div className={textarea ? undefined : "min-w-0"}>
      <label htmlFor={id} className="label mb-2.5 block text-slate-dim">
        {label}
      </label>
      {textarea ? (
        <textarea {...shared} rows={5} maxLength={1200} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-amber">
          {error}
        </p>
      ) : null}
    </div>
  );
}
