import type { BookingDates, Booking } from '../types/booking';

export type BookingsInput = BookingDates & {
    guest_name: string;
    guest_email: string;
    guests: number;
}
export type CreateBookingState = {
    error?: string;
    booked?: boolean;
}

export async function createBooking(
    propertyId: string,
    booking: BookingsInput,
): Promise<CreateBookingState> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/properties/${propertyId}`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...booking, status: "pending" }),
        }
    )

    if (response.status === 401) {
        return { error: "You need to be logged in to create a booking" };
    }

    if (response.status === 400) {
        const body = await response.json();
        return { error: body.errors[0][1] };
    }

    if (!response.ok) {
        return { error: "Failed to create booking, try again" };
    }

    return { booked: true };
}

export async function getBookings(propertyId: string): Promise<Booking[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/properties/${propertyId}`,
        {
            credentials: "include"
        },
    )

    if (!response.ok) {
        return []
    }

    return response.json()
}

export async function deleteBooking(propertyId: string, bookingId: string): Promise<{ error?: string }> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/properties/${propertyId}/${bookingId}`,
        {
            method: "DELETE",
            credentials: "include"
        },
    )

    if (response.status === 401) {
        return { error: "You need to be logged in to delete a booking" }
    }

    if (!response.ok) {
        return { error: "Failed to delete booking, try again" }
    }

    return {}
}
