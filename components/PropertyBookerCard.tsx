"use client";

import { BookingDates } from "@/types/booking"
import type { Property } from "@/types/property"
import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth"
import BookingPicker from "./BookingPicker"
import { createBooking } from "@/utils/bookingService"

const cardClassName = "rounded-3xl border border-[#dce2dc] bg-white p-5 shadow-[0_18px_60px_rgba(31,55,43,0.11)] sm:p-6"
const fieldClassName = "w-full rounded-xl border border-[#d5dcd6] bg-[#fbfcfa] px-3.5 py-2.5 text-sm text-[#202923] outline-none placeholder:text-[#909891] focus:border-[#1f6f50] focus:ring-3 focus:ring-[#1f6f50]/10"

type PropertyBookerCard = {
    property: Property
}

export default function PropertyBookerCard({ property }: PropertyBookerCard) {
    const auth = useAuth()

    const [error, setError] = useState<string>()
    const [booked, setBooked] = useState(false)
    const [pending, setPending] = useState(false)
    const [bookingDates, setBookingDates] = useState<BookingDates>()

    const msPerDay = 1000 * 60 * 60 * 24
    const nights = bookingDates
        ? (new Date(bookingDates.check_out).getTime() - new Date(bookingDates.check_in).getTime()) / msPerDay
        : 0
    const totalPrice = nights * property.price_per_night

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
            if (result.booked) {
                window.dispatchEvent(new Event("bookings-changed"))
            }
        } finally {
            setPending(false)
        }
    }
    if (auth.loading) {
        return <div className={`${cardClassName} h-72 animate-pulse bg-[#edf0ec]`} aria-label="Loading booking form" />
    }

    if (!auth.user) {
        return (
            <div className={cardClassName}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f6f50]">Ready when you are</p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#202923]">Book this stay</h2>
                <p className="mt-3 text-sm leading-6 text-[#667068]">Log in or create an account to choose your dates.</p>
                <div className="mt-6 flex items-center gap-3">
                    <Link href="/auth/login" className="rounded-full bg-[#1f6f50] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#15543c]">Log in</Link>
                    <Link href="/auth/register" className="rounded-full border border-[#cfd6d0] px-5 py-2.5 text-sm font-bold text-[#374139] hover:border-[#1f6f50] hover:text-[#1f6f50]">Register</Link>
                </div>
            </div>
        )
    }

    return (
        <div className={cardClassName}>
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667068]">From</p>
                    <p className="mt-1 text-2xl font-bold text-[#202923]">{property.price_per_night} kr</p>
                </div>
                <p className="pb-1 text-sm text-[#667068]">per night</p>
            </div>
            <div className="border-y border-[#e2e6e2] py-4">
                <BookingPicker initialDates={bookingDates} selectDates={setBookingDates} />
            </div>
            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#374139]">
                    Name
                    <input name="guest_name" required className={fieldClassName} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#374139]">
                    Email
                    <input
                        name="guest_email"
                        type="email"
                        required
                        defaultValue={auth.user.email}
                        className={fieldClassName}
                    />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#374139]">
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
                {nights > 0 ? (
                    <div className="flex items-center justify-between rounded-xl bg-[#eef4f0] px-4 py-3 text-sm">
                        <span className="text-[#566159]">{nights} {nights === 1 ? "night" : "nights"}</span>
                        <span className="font-bold text-[#1f6f50]">{totalPrice} kr total</span>
                    </div>
                ) : null}
                {error ? (
                    <p className="rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700">{error}</p>
                ) : null}
                {booked ? (
                    <p className="rounded-xl bg-emerald-50 px-3.5 py-3 text-sm font-medium text-emerald-700">Booking created.</p>
                ) : null}
                <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-full bg-[#1f6f50] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#15543c] disabled:opacity-60"
                >
                    {pending ? "Booking…" : "Book"}
                </button>
            </form>
        </div>
    )
}
