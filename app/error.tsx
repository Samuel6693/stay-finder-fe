"use client";

import T from "@/components/typography";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[#e5eee8] text-[#1f6f50]">
        <span className="text-2xl font-bold">!</span>
      </div>
      <T.Header size="lg" className="text-3xl tracking-[-0.04em] text-[#202923]">Something went wrong</T.Header>
      <p className="mt-3 text-[#667068]">
        We could not load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-[#1f6f50] px-6 py-3 text-sm font-bold text-white hover:bg-[#15543c]"
      >
        Try again
      </button>
    </main>
  );
}
