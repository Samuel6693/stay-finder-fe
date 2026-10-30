import type { BookingDates } from '../types/booking';

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

    if (!response.ok) {
        return { error: "Failed to create booking, try again" };
    }

    return { booked: true };
}