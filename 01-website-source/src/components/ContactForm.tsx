"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Magnet } from "@/components/fx/Magnet";
import { site } from "@/lib/site";

type Props = {
  intent?: string;
};

export function ContactForm({ intent = "General" }: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Unimade — ${intent} — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
          <p className="font-display text-4xl text-white">Sent to your inbox app.</p>
          <p className="hand-label mt-3 text-2xl text-violet-200">
            if nothing happens, write us at {site.email}
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-zinc-400">
            Name
            <input name="name" required placeholder="What do we call you?" className="input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-400">
            Email
            <input name="email" type="email" required placeholder="you@college.edu" className="input" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-400 sm:col-span-2">
            What can we help with?
            <textarea name="message" required rows={5} placeholder="Laundry mountain? Partnership idea? Tell us." className="input min-h-32 resize-none" />
          </label>
          <div className="flex items-center gap-4 sm:col-span-2">
            <Magnet strength={0.2}>
              <button type="submit" className="btn-primary">
                Send it →
              </button>
            </Magnet>
            <span className="text-sm text-zinc-500">
              as a <span className="text-violet-300">{intent.toLowerCase()}</span>
            </span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
