"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  company,
  getEnquiryTypes,
  getProductBySlug,
  getServiceBySlug,
} from "@/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success";

const fieldClasses =
  "h-12 w-full rounded-xl2 border border-ink/12 bg-white px-4 text-[0.9375rem] text-ink transition-colors duration-300 placeholder:text-warm-300 hover:border-ink/20 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/25";

/**
 * Enquiry form.
 *
 * The enquiry type is pre-selected from `?subject=`, and a `?ref=` product or
 * service slug is turned into an opening line of the message — so a buyer who
 * clicked "Enquire about this product" never has to retype what they were
 * already looking at. That small continuity is most of what makes a static
 * site feel engineered rather than assembled.
 *
 * There is no backend by design (the brief specifies a static site), so submit
 * hands off to the user's mail client via a composed `mailto:`. The form still
 * validates natively, so nothing broken reaches the draft.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const enquiryTypes = getEnquiryTypes();

  const subjectParam = searchParams.get("subject");
  const refParam = searchParams.get("ref");

  const [status, setStatus] = useState<Status>("idle");

  /**
   * Both fields are seeded from the URL during the initial render rather than
   * in an effect. The params cannot change without a navigation that remounts
   * this component, so an effect would only add a second render — and would
   * also fight the user if they edited the field before it ran.
   */
  const [subject, setSubject] = useState(() =>
    subjectParam && enquiryTypes.some((t) => t.value === subjectParam)
      ? subjectParam
      : "product",
  );

  const [message, setMessage] = useState(() => {
    if (!refParam) return "";
    const name =
      getProductBySlug(refParam)?.name ?? getServiceBySlug(refParam)?.title;
    return name
      ? `I would like more information about ${name}.\n\nMarket: \nEstimated volume: \nTarget launch date: `
      : "";
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    const label =
      enquiryTypes.find((t) => t.value === data.get("subject"))?.label ??
      "Enquiry";

    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "—"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Country / market: ${data.get("country") || "—"}`,
      `Enquiry type: ${label}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    const recipient =
      company.emails.find((e) => e.label.includes("Export"))?.value ??
      company.emails[0].value;

    const href = `mailto:${recipient}?subject=${encodeURIComponent(
      `${label} — website enquiry`,
    )}&body=${encodeURIComponent(body)}`;

    // Brief pause so the state change is perceptible rather than a flicker.
    window.setTimeout(() => {
      window.location.href = href;
      setStatus("success");
    }, 500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl3 border border-ink/8 bg-white p-7 shadow-[0_30px_70px_-40px_rgba(11,11,12,0.3)] lg:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClasses}
          />
        </Field>

        <Field label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={fieldClasses}
          />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClasses}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+20 ..."
            className={fieldClasses}
          />
        </Field>

        <Field label="Country / market" htmlFor="country">
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="Where the product will sell"
            className={fieldClasses}
          />
        </Field>

        <Field label="Enquiry type" htmlFor="subject" required>
          <select
            id="subject"
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={cn(fieldClasses, "appearance-none bg-white pr-10")}
          >
            {enquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message" htmlFor="message" required>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us the format, the volume and the market you are planning for."
              className={cn(
                fieldClasses,
                "h-auto resize-y py-3.5 leading-relaxed",
              )}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          icon={
            status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2} />
            ) : (
              <ArrowRight className="size-[1.05rem]" strokeWidth={1.8} />
            )
          }
        >
          {status === "submitting" ? "Opening…" : "Send enquiry"}
        </Button>

        <p className="text-sm text-warm-400">
          We reply within one business day.
        </p>
      </div>

      {/* Status is announced, not just shown. */}
      <p aria-live="polite" className="mt-4 text-sm">
        {status === "success" ? (
          <span className="inline-flex items-center gap-2 text-gold-700">
            <Check className="size-4" strokeWidth={2.2} aria-hidden="true" />
            Your email client should now be open with the enquiry drafted.
          </span>
        ) : (
          <span className="sr-only">Form ready.</span>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-warm-400"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-gold-600">
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
