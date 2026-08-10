import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Replace with the real submission endpoint. */
const CONTACT_ENDPOINT = "[CONTACT_ENDPOINT]";

type Status = "idle" | "submitting" | "success" | "error";
type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR = "#e5675d";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Tell us who you are.";
  if (!f.email.trim()) e.email = "We need a way to reach you.";
  else if (!EMAIL_RE.test(f.email)) e.email = "That email doesn't look right.";
  if (f.message.trim().length < 10)
    e.message = "A sentence or two about the problem helps.";
  return e;
}

export function Invitation() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setStatus("submitting");
    try {
      // When a real endpoint is configured, POST there. Until then we simulate
      // a successful round-trip so the success state is exercisable.
      if (CONTACT_ENDPOINT.startsWith("http")) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" eyebrow="Invitation">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-title text-fg">Let's discuss a problem.</h2>
          <p className="measure mt-6 text-body text-fg-2">
            Tell us what's slow, manual, or stuck. If there's an AI system worth
            building, we'll say so honestly — and then we can build it.
          </p>
          <p className="mt-10 font-mono text-sm text-fg-3">
            Prefer email?{" "}
            <a
              href="mailto:[PLACEHOLDER@EMAIL]"
              className="text-fg-2 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              [PLACEHOLDER@EMAIL]
            </a>
          </p>
        </div>

        <Reveal>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                className="glass flex min-h-72 flex-col justify-center rounded-lg p-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="accent-gradient flex h-11 w-11 items-center justify-center rounded-full text-accent-fg">
                  <Check size={20} />
                </span>
                <h3 className="mt-6 text-subtitle text-fg">Message received.</h3>
                <p className="measure mt-3 text-body text-fg-2">
                  We'll be in touch within one business day. In the meantime,
                  we're already thinking about your problem.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFields({ name: "", email: "", message: "" });
                    setErrors({});
                    setStatus("idle");
                  }}
                  className="mt-6 self-start font-mono text-sm text-fg-3 underline decoration-line underline-offset-4 transition-colors hover:text-fg"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  id="name"
                  label="Name"
                  value={fields.name}
                  onChange={update("name")}
                  error={errors.name}
                  autoComplete="name"
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <FormField
                  id="message"
                  label="What are you trying to solve?"
                  value={fields.message}
                  onChange={update("message")}
                  error={errors.message}
                  multiline
                />

                {status === "error" && (
                  <p role="alert" className="text-sm" style={{ color: ERROR }}>
                    Something went wrong sending that. Try again, or email us
                    directly.
                  </p>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  magnetic={false}
                  disabled={status === "submitting"}
                  className="self-start"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                  {status !== "submitting" && <ArrowRight size={18} />}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}

interface FormFieldProps {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline,
  autoComplete,
}: FormFieldProps) {
  const base =
    "w-full bg-transparent border-b py-3 text-body text-fg placeholder:text-fg-3 outline-none transition-colors duration-200";
  const borderCls = error
    ? "border-[#e5675d]"
    : "border-line focus:border-accent";

  return (
    <div>
      <label
        htmlFor={id}
        className="eyebrow mb-3 block text-fg-2"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(base, borderCls, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(base, borderCls)}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm" style={{ color: ERROR }}>
          {error}
        </p>
      )}
    </div>
  );
}
