"use client";

import { useEffect, useState, type FormEvent } from "react"
import { useAuth } from "@/contexts/auth"
import type { Booking } from "@/types/booking"
import { getBookings, deleteBooking, updateBooking } from "@/utils/bookingService"

const fieldClassName = "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-300"

type MyBookingsProps = {
    propertyId: string
}

export default function MyBookings({ propertyId }: MyBookingsProps) {
    const auth = useAuth()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [error, setError] = useState<string>()
    const [editingId, setEditingId] = useState<string>()
    const [editError, setEditError] = useState<string>()

    useEffect(() => {
        if (!auth.user) {
            return
        }
        function load() {
            getBookings(propertyId).then(setBookings)
        }
        load()
        window.addEventListener("bookings-changed", load)
        return () => window.removeEventListener("bookings-changed", load)
    }, [auth.user, propertyId])

    async function onDelete(bookingId: string) {
        setError(undefined)
        const result = await deleteBooking(propertyId, bookingId)
        if (result.error) {
            setError(result.error)
            return
        }
        setBookings((current) => current.filter((b) => b.booking_id !== bookingId))
    }

    function startEdit(bookingId: string) {
        setEditError(undefined)
        setEditingId(bookingId)
    }

    async function onSave(event: FormEvent<HTMLFormElement>, bookingId: string) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setEditError(undefined)
        const result = await updateBooking(propertyId, bookingId, {
            check_in: String(formData.get("check_in") ?? ""),
            check_out: String(formData.get("check_out") ?? ""),
            guests: Number(formData.get("guests")),
        })
        if (!result.booking) {
            setEditError(result.error)
            return
        }
        const updated = result.booking
        setBookings((current) => current.map((b) => (b.booking_id === bookingId ? updated : b)))
        setEditingId(undefined)
    }

    if (!auth.user || bookings.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Your bookings</h2>
            {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
            <ul className="flex flex-col gap-3">
                {bookings.map((booking) => (
                    <li
                        key={booking.booking_id}
                        className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800"
                    >
                        {editingId === booking.booking_id ? (
                            <form onSubmit={(event) => onSave(event, booking.booking_id)} className="flex flex-col gap-3">
                                <label className="flex flex-col gap-1">
                                    Check-in
                                    <input
                                        name="check_in"
                                        type="date"
                                        required
                                        defaultValue={booking.check_in}
                                        className={fieldClassName}
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    Check-out
                                    <input
                                        name="check_out"
                                        type="date"
                                        required
                                        defaultValue={booking.check_out}
                                        className={fieldClassName}
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    Guests
                                    <input
                                        name="guests"
                                        type="number"
                                        min={1}
                                        required
                                        defaultValue={booking.guests}
                                        className={fieldClassName}
                                    />
                                </label>
                                {editError ? (
                                    <p className="text-red-600 dark:text-red-400">{editError}</p>
                                ) : null}
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-zinc-900 px-3 py-1.5 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingId(undefined)}
                                        className="hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <p className="font-medium">
                                    Check-in: {booking.check_in} | Check-out: {booking.check_out}
                                </p>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                                </p>
                                <div className="mt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(booking.booking_id)}
                                        className="hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(booking.booking_id)}
                                        className="text-red-600 hover:underline dark:text-red-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
