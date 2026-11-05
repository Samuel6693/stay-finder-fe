"use client";

import { useState } from "react";
import type {SubmitEvent} from "react"
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

type AuthFromProps = { // from takes one of two modes, login or register
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFromProps) {
    const auth = useAuth()
    const router = useRouter()
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    setError(undefined);
    setPending(true);
    const response = mode === "login" 
      ? await auth.login(email, password)
      : await auth.register(email, password);
    setPending(false)
    if(typeof response === "string") {
        setError(response)
        return;
    }
    router.push("/")
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f6f50]">{mode === "login" ? "Welcome back" : "Join Stay Finder"}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#202923]">{mode === "login" ? "Log in to your account" : "Create your account"}</h1>
        <p className="mt-3 text-sm leading-6 text-[#667068]">{mode === "login" ? "Your next memorable stay is waiting." : "Save your details and start booking stays."}</p>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#374139]">
        Email
        <input name="email" type="email" placeholder="you@example.com" required className="rounded-xl border border-[#d5dcd6] bg-[#fbfcfa] px-4 py-3 font-normal outline-none focus:border-[#1f6f50]" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#374139]">
        Password
        <input name="password" type="password" placeholder="At least 6 characters" minLength={6} required className="rounded-xl border border-[#d5dcd6] bg-[#fbfcfa] px-4 py-3 font-normal outline-none focus:border-[#1f6f50]" />
      </label>
      <button type="submit" disabled={pending} className="mt-1 rounded-full bg-[#1f6f50] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#15543c] disabled:opacity-60">
        {pending ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
      </button>
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
    </form>
  );
}
