"use client";

import PropertyForm from "@/components/PropertyForm";
import T from "@/components/typography";
import { createProperty } from "@/utils/propertyService";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const router = useRouter();

  async function onCreate(formData: FormData) {
    const result = await createProperty(formData);
    if (result.propertyId) {
      router.push(`/properties/${result.propertyId}`);
    }
    return result;
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f6f50]">Become a host</p>
        <T.Header size="lg" className="mt-3 text-4xl tracking-[-0.045em] text-[#202923]">Share a place people will remember.</T.Header>
        <p className="mt-5 max-w-md leading-7 text-[#667068]">Add the essential details about your stay. You can review the finished listing as soon as it is created.</p>
      </div>
      <div className="rounded-3xl border border-[#dce2dc] bg-white p-6 shadow-[0_18px_60px_rgba(31,55,43,0.08)] sm:p-9">
        <h1 className="mb-7 text-2xl font-bold tracking-[-0.03em] text-[#202923]">Stay details</h1>
        <PropertyForm action={onCreate} />
      </div>
    </main>
  );
}
