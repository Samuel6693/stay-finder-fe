"use client";

import { useEffect, useState, type FormEvent } from "react"
import { useAuth } from "@/contexts/auth"
import type { Booking } from "@/types/booking"
import { getBookings, deleteBooking, updateBooking } from "@/utils/bookingService"

const fieldClassName = "w-full rounded-xl border border-[#d5dcd6] bg-[#fbfcfa] px-3.5 py-2.5 text-sm outline-none focus:border-[#1f6f50]"

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

    const ownBookings = bookings.filter((b) => b.user_id === auth.user?.id)
    const guestBookings = bookings.filter((b) => b.user_id !== auth.user?.id)

    function renderBooking(booking: Booking) {
        return (
            <li key={booking.booking_id}
                className="rounded-2xl border border-[#dce2dc] bg-white p-5 text-sm shadow-sm">
                {editingId === booking.booking_id ? (
                    <form onSubmit={(event) => onSave(event, booking.booking_id)} className="flex flex-col gap-3">
                        <label className="flex flex-col gap-1">
                            Check-in
                            <input name="check_in" type="date" required
                                defaultValue={booking.check_in}
                                className={fieldClassName} />
                        </label>
                        <label className="flex flex-col gap-1">
                            Check-out
                            <input name="check_out" type="date" required
                                defaultValue={booking.check_out}
                                className={fieldClassName} />
                        </label>
                        <label className="flex flex-col gap-1">
                            Guests
                            <input name="guests" type="number" min={1} required
                                defaultValue={booking.guests}
                                className={fieldClassName} />
                        </label>
                        {editError ? (
                            <p className="rounded-xl bg-red-50 px-3 py-2 text-red-700">{editError}</p>
                        ) : null}
                        <div className="flex gap-3">
                            <button type="submit" className="rounded-full bg-[#1f6f50] px-4 py-2 font-bold text-white hover:bg-[#15543c]">
                                Save
                            </button>
                            <button type="button"
                                onClick={() => setEditingId(undefined)}
                            className="rounded-full px-3 py-2 font-semibold text-[#667068] hover:bg-[#f2f4f1]">
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="font-semibold text-[#26302a]">
                            Check-in: {booking.check_in} | Check-out: {booking.check_out}
                        </p>
                        <p className="mt-1 text-[#667068]">
                            {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                        </p>
                        {booking.user_id === auth.user?.id ? (
                            <div className="mt-2 flex gap-3">
                                <button type="button"
                                    onClick={() => startEdit(booking.booking_id)}
                                    className="rounded-full bg-[#eef4f0] px-3 py-1.5 font-semibold text-[#1f6f50] hover:bg-[#e1ede6]">
                                    Edit
                                </button>
                                <button type="button"
                                    onClick={() => onDelete(booking.booking_id)}
                                    className="rounded-full px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50">
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <p className="mt-2 text-[#667068]">
                                Guest: {booking.guest_name}
                            </p>
                        )}
                    </>
                )}
            </li>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            {ownBookings.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1f6f50]">Trips</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#202923]">Your bookings</h2>
                    </div>
                    <ul className="flex flex-col gap-3">{ownBookings.map(renderBooking)}</ul>
                </div>
            ) : null}
            {guestBookings.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1f6f50]">Hosting</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#202923]">Bookings from your guests</h2>
                    </div>
                    <ul className="flex flex-col gap-3">{guestBookings.map(renderBooking)}</ul>
                </div>
            ) : null}
        </div>
    )
}
