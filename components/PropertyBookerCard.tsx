"use client";

import { BookingDates } from "@/types/booking"
import type { Property } from "@/types/property"
import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth"
import BookingPicker from "./BookingPicker"
import { createBooking } from "@/utils/bookingService"

const cardClassName = "block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
const fieldClassName = "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-300"

type PropertyBookerCard = {
    property: Property
}

export default function PropertyBookerCard({ property }: PropertyBookerCard) {
    const auth = useAuth()

    const [error, setError] = useState<string>()
    const [booked, setBooked] = useState(false)
    const [pending, setPending] = useState(false)
    const [bookingDates, setBookingDates] = useState<BookingDates>()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!bookingDates) {
            setError("Choose check-in and check-out dates.")
            return
        }

        const formData = new FormData(event.currentTarget)
        setError(undefined)
        setBooked(false)
        setPending(true)
        try {
            const result = await createBooking(property.property_id, {
                ...bookingDates,
                guest_name: String(formData.get("guest_name") ?? "").trim(),
                guest_email: String(formData.get("guest_email") ?? "").trim(),
                guests: Number(formData.get("guests")),
            })
            setError(result.error)
            setBooked(Boolean(result.booked))
        } finally {
            setPending(false)
        }
    }
    if (auth.loading) {
        return <div className={cardClassName}>Loading...</div>
    }

    if (!auth.user) {
        return (
            <div className={cardClassName}>
                <p className="mb-3">Log in to book this stay.</p>
                <div className="flex items-center gap-3">
                    <Link href="/auth/login">Log in</Link>
                    <Link href="/auth/register">Register</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={cardClassName}>
            <BookingPicker initialDates={bookingDates} selectDates={setBookingDates} />
            <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm">
                    Name
                    <input name="guest_name" required className={fieldClassName} />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                    Email
                    <input
                        name="guest_email"
                        type="email"
                        required
                        defaultValue={auth.user.email}
                        className={fieldClassName}
                    />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                    Guests
                    <input
                        name="guests"
                        type="number"
                        min={1}
                        max={property.max_guests}
                        required
                        className={fieldClassName}
                    />
                </label>
                {error ? (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                ) : null}
                {booked ? (
                    <p className="text-sm text-green-600 dark:text-green-400">Booking created.</p>
                ) : null}
                <button
                    type="submit"
                    disabled={pending}
                    className="w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
                >
                    {pending ? "Booking…" : "Book"}
                </button>
            </form>
        </div>
    )
}
