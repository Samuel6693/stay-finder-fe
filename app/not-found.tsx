import T from "@/components/typography";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f6f50]">404</p>
            <T.Header size="lg" className="mt-3 text-4xl tracking-[-0.045em] text-[#202923]">Stay not found</T.Header>
            <p className="mt-4 max-w-md leading-7 text-[#667068]">
                We could not find the stay you were looking for. It may have been removed.
            </p>
            <Link
                href="/"
                className="mt-7 rounded-full bg-[#1f6f50] px-6 py-3 text-sm font-bold text-white hover:bg-[#15543c]"
            >
                Back to all stays
            </Link>
        </main>
    );
}
