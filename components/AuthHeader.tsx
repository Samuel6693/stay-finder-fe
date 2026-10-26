"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import T from "./typography";

export default function AuthHeader() {
    const auth = useAuth()

    console.log("auth", auth)
    if (auth.loading) {
        return (
            <div>
                <T.Header>Loading...</T.Header>
            </div>
        )
    }

    return (
        <div>
            {!auth.user && (
                <div className="flex items-center gap-3">
                    <T.Header>Not logged in</T.Header>
                    <Link href="/auth/login">Log in</Link>
                    <Link href="/auth/register">Register</Link>
                </div>
            )}
            {auth.user && (
                <div className="flex items-center gap-3">
                    <Link
                        href="/host/properties/new"
                        className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                    >
                        List a stay
                    </Link>
                    <T.Header>Logged in {auth.user.email}</T.Header>
                    <button type="button" onClick={() => auth.logout()}>Log out</button>
                </div>
            )}
        </div>
    )
}
