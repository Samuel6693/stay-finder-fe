import T from "@/components/typography";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
            <T.Header size="lg">Stay not found</T.Header>
            <p className="text-zinc-600 dark:text-zinc-400">
                We could not find the stay you were looking for. It may have been removed.
            </p>
            <Link
                href="/"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
                Back to all stays
            </Link>
        </main>
    );
}
