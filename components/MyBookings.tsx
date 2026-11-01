"use client";

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth"
import type { Booking } from "@/types/booking"
import { getBookings, deleteBooking } from "@/utils/bookingService"

type MyBookingsProps = {
    propertyId: string
}

export default function MyBookings({ propertyId }: MyBookingsProps) {
    const auth = useAuth()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [error, setError] = useState<string>()

    useEffect(() => {
        if (!auth.user) {
            return
        }
        getBookings(propertyId).then(setBookings)
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
                        <p className="font-medium">
                            Check-in: {booking.check_in} | Check-out: {booking.check_out}
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                        </p>
                        <button
                            type="button"
                            onClick={() => onDelete(booking.booking_id)}
                            className="mt-2 text-sm text-red-600 hover:underline dark:text-red-400"
                        >
                            Delete
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    )
}
