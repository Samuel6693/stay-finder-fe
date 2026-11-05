"use client";

import { SubmitEvent, useState } from "react";
import type { CreatePropertyState } from "@/utils/propertyService";

const fieldClassName =
  "w-full rounded-xl border border-[#d5dcd6] bg-[#fbfcfa] px-4 py-3 text-sm text-[#202923] outline-none focus:border-[#1f6f50]";
const labelClassName = "flex flex-col gap-1.5 text-sm font-semibold text-[#374139]";

export type PropertyFormValues = {
  title?: string;
  description?: string;
  location?: string;
  kind?: string;
  max_guests?: number;
  price_per_night?: number;
};

type PropertyFormProps = {
  action: (formData: FormData) => Promise<CreatePropertyState>;
  values?: PropertyFormValues;
  submitLabel?: string;
  pendingLabel?: string;
};

export default function PropertyForm({
  action,
  values,
  submitLabel = "Create stay",
  pendingLabel = "Creating…",
}: PropertyFormProps) {
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(undefined);
    setPending(true);
    try {
      const result = await action(formData);
      setError(result.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label className={labelClassName}>
        Title
        <input
          name="title"
          required
          defaultValue={values?.title}
          className={fieldClassName}
        />
      </label>
      <label className={labelClassName}>
        Description
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={values?.description}
          className={fieldClassName}
        />
      </label>
      <label className={labelClassName}>
        Location
        <input
          name="location"
          required
          defaultValue={values?.location}
          className={fieldClassName}
        />
      </label>
      <label className={labelClassName}>
        Kind
        <select
          name="kind"
          required
          defaultValue={values?.kind ?? ""}
          className={fieldClassName}
        >
          <option value="" disabled>
            Choose a kind
          </option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
        </select>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className={labelClassName}>
          Max guests
          <input
            name="max_guests"
            type="number"
            min={1}
            required
            defaultValue={values?.max_guests}
            className={fieldClassName}
          />
        </label>
        <label className={labelClassName}>
          Price per night
          <input
            name="price_per_night"
            type="number"
            min={100}
            required
            defaultValue={values?.price_per_night}
            className={fieldClassName}
          />
        </label>
      </div>
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-[#1f6f50] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#15543c] disabled:opacity-60"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
