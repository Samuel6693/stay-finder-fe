"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth";

export default function AuthHeader() {
    const auth = useAuth()

    if (auth.loading) {
        return (
            <div className="h-9 w-40 animate-pulse rounded-full bg-[#e7eae5]" aria-label="Loading account" />
        )
    }

    return (
        <nav aria-label="Account navigation">
            {!auth.user && (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link href="/auth/login" className="rounded-full px-3 py-2 text-sm font-semibold text-[#374139] hover:bg-white">
                        Log in
                    </Link>
                    <Link href="/auth/register" className="rounded-full bg-[#1f6f50] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#15543c]">
                        Register
                    </Link>
                </div>
            )}
            {auth.user && (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/host/properties/new"
                        className="hidden rounded-full border border-[#cfd6d0] bg-white px-4 py-2 text-sm font-semibold text-[#374139] shadow-sm hover:border-[#1f6f50] hover:text-[#1f6f50] sm:block"
                    >
                        List a stay
                    </Link>
                    <span className="hidden max-w-48 truncate text-sm text-[#667068] lg:block">{auth.user.email}</span>
                    <button type="button" onClick={() => auth.logout()} className="rounded-full px-3 py-2 text-sm font-semibold text-[#374139] hover:bg-white">
                        Log out
                    </button>
                </div>
            )}
        </nav>
    )
}
