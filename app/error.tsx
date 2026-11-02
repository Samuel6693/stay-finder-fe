"use client";

import T from "@/components/typography";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <T.Header size="lg">Something went wrong</T.Header>
      <p className="text-zinc-600 dark:text-zinc-400">
        We could not load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Try again
      </button>
    </main>
  );
}
