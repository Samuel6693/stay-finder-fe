import MyBookings from "@/components/MyBookings";
import PropertyBookerCard from "@/components/PropertyBookerCard";
import T from "@/components/typography";
import { getPropertyById } from "@/utils/propertyService";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PropertyPage({
  params,
}: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) {
    notFound();
  }

  const isVilla = property.kind === "villa";

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="mb-7 flex w-fit items-center gap-2 text-sm font-semibold text-[#667068] hover:text-[#1f6f50]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        All stays
      </Link>
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span className="rounded-full bg-[#e3efe8] px-3 py-1 capitalize text-[#1f6f50]">{property.kind}</span>
          <span className="text-[#667068]">{property.location}</span>
        </div>
        <T.Header size="lg" className="max-w-4xl text-4xl tracking-[-0.045em] text-[#18201b] sm:text-5xl">{property.title}</T.Header>
      </div>
      <div className={`relative mb-10 aspect-[16/7] min-h-64 overflow-hidden rounded-[2rem] ${isVilla ? "bg-[#dce8d9]" : "bg-[#e7ded3]"}`}>
        <div className={`absolute inset-0 ${isVilla ? "bg-[radial-gradient(circle_at_78%_22%,#f4c48d_0,transparent_23%),linear-gradient(145deg,#bfdac8,#edf1e5)]" : "bg-[radial-gradient(circle_at_20%_16%,#f6cca0_0,transparent_24%),linear-gradient(145deg,#dcd1c4,#f0ebe4)]"}`} />
        <svg viewBox="0 0 800 360" className="absolute inset-x-0 bottom-0 mx-auto h-full max-w-4xl text-[#285b45]" fill="none" aria-hidden="true">
          <path d={isVilla ? "M80 310h640M180 310V152L400 34l220 118v158M270 310v-92h105v92M452 172h86v76h-86z" : "M112 311h576M184 311V54h432v257M250 110h92v72h-92zM458 110h92v72h-92zM250 221h92v63h-92zM458 221h92v63h-92z"} stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
        </svg>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div className="min-w-0">
          <section className="border-b border-[#dde2dc] pb-9">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#202923]">About this stay</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#566159]">{property.description}</p>
          </section>
          <dl className="grid grid-cols-2 gap-4 border-b border-[#dde2dc] py-9 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <dt className="text-xs font-bold uppercase tracking-[0.13em] text-[#7a847c]">Nightly rate</dt>
              <dd className="mt-2 text-xl font-bold text-[#202923]">{property.price_per_night} kr</dd>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <dt className="text-xs font-bold uppercase tracking-[0.13em] text-[#7a847c]">Guests</dt>
              <dd className="mt-2 text-xl font-bold text-[#202923]">Up to {property.max_guests}</dd>
            </div>
            <div className="col-span-2 rounded-2xl bg-white p-5 shadow-sm sm:col-span-1">
              <dt className="text-xs font-bold uppercase tracking-[0.13em] text-[#7a847c]">Stay type</dt>
              <dd className="mt-2 text-xl font-bold capitalize text-[#202923]">{property.kind}</dd>
            </div>
          </dl>
          <section className="pt-9">
            <MyBookings propertyId={property.property_id} />
          </section>
        </div>
        <div className="lg:sticky lg:top-28">
          <PropertyBookerCard property={property} />
        </div>
      </div>
    </main>
  );
}
