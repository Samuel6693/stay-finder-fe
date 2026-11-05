import type { Property } from "@/types/property";
import { cn } from "@/utils/cn";
import Link from "next/link";

type PropertyCardProps = {
  property: Property;
  className?: string;
};

export default function PropertyCard({
  property,
  className,
}: PropertyCardProps) {
  const isVilla = property.kind === "villa";
  return (
    <Link
      href={`/properties/${property.property_id}`}
      className={cn(
        "group block min-w-0",
        className,
      )}
    >
      <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${isVilla ? "bg-[#dce8d9]" : "bg-[#e7ded3]"}`}>
        <div className={`absolute inset-0 opacity-90 ${isVilla ? "bg-[radial-gradient(circle_at_75%_25%,#f5c997_0,transparent_30%),linear-gradient(145deg,#c4ddcd,#eaf0e3)]" : "bg-[radial-gradient(circle_at_25%_20%,#f6d0a6_0,transparent_28%),linear-gradient(145deg,#ded4c7,#eee8df)]"}`} />
        <svg viewBox="0 0 400 300" className="absolute inset-x-0 bottom-0 w-full text-[#285b45] transition duration-500 group-hover:scale-[1.03]" fill="none" aria-hidden="true">
          <path d={isVilla ? "M42 238h316M88 238V126l112-70 112 70v112M133 238v-68h54v68M226 143h42v42h-42z" : "M53 239h294M92 239V78h216v161M123 109h45v42h-45zM232 109h45v42h-45zM123 177h45v37h-45zM232 177h45v37h-45z"} stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
        </svg>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold capitalize text-[#374139] shadow-sm backdrop-blur">
          {property.kind}
        </span>
        <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-[#1f6f50] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 truncate text-lg font-bold tracking-[-0.025em] text-[#202923] group-hover:text-[#1f6f50]">{property.title}</h2>
          <p className="shrink-0 text-sm font-bold text-[#202923]">{property.price_per_night} kr</p>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 text-sm text-[#667068]">
          <p className="truncate">{property.location}</p>
          <p className="shrink-0">/ night</p>
        </div>
        <p className="mt-2 text-sm text-[#667068]">Up to {property.max_guests} guests</p>
      </div>
    </Link>
  );
}
