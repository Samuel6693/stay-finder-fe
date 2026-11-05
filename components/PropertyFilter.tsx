"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import type { PropertiesFilter } from "@/utils/propertyService";

type SearchBarProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

function Searchbar({ search, setSearch }: SearchBarProps) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#667068]">Where</span>
      <input
        type="search"
        value={search}
        placeholder="City or region"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-[#18201b] outline-none placeholder:text-[#8c958e]"
      />
    </label>
  );
}

type PropertyFilterProps = {
  filter: PropertiesFilter;
};

export default function PropertyFilter({ filter }: PropertyFilterProps) {
  const router = useRouter();
  const [search, setSearch] = useState(filter.location || "");
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice || "");
  const [maxGuests, setMaxGuests] = useState(filter.maxGuests || "");
  const [sort, setSort] = useState(filter.sort || "");

  const onFiltering = () => {
    const params = new URLSearchParams();
    if (search) {
      params.set("location", search);
    }
    if (maxPrice) {
      params.set("maxprice", String(maxPrice));
    }
    if (maxGuests) {
      params.set("maxguests", String(maxGuests));
    }
    if (sort) {
      params.set("sort", sort);
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  const fieldWrap = "flex min-w-0 flex-col gap-1.5 border-t border-[#e0e4df] px-1 pt-4 sm:border-l sm:border-t-0 sm:px-5 sm:pt-0";
  const labelClass = "text-xs font-bold uppercase tracking-[0.14em] text-[#667068]";
  const inputClass = "w-full bg-transparent text-sm font-medium text-[#18201b] outline-none placeholder:text-[#8c958e]";

  return (
    <div className="grid gap-4 rounded-3xl border border-[#dce2dc] bg-white p-5 shadow-[0_18px_55px_rgba(31,55,43,0.12)] sm:grid-cols-[1.4fr_0.8fr_0.7fr_1fr_auto] sm:items-center sm:gap-0 sm:rounded-full sm:px-6 sm:py-4">
      <Searchbar search={search} setSearch={setSearch} />
      <label className={fieldWrap}>
        <span className={labelClass}>Budget</span>
        <input type="number" min={1} value={maxPrice} placeholder="Any price" onChange={(e) => setMaxPrice(e.target.value)} className={inputClass} />
      </label>
      <label className={fieldWrap}>
        <span className={labelClass}>Guests</span>
        <input type="number" min={1} value={maxGuests} placeholder="Add guests" onChange={(e) => setMaxGuests(e.target.value)} className={inputClass} />
      </label>
      <label className={fieldWrap}>
        <span className={labelClass}>Sort</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${inputClass} cursor-pointer`}>
          <option value="">Recommended</option>
          <option value="price_asc">Lowest price</option>
          <option value="price_desc">Highest price</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onFiltering}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#1f6f50] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#15543c] sm:ml-3 sm:h-13 sm:w-13 sm:px-0"
        aria-label="Search stays"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" strokeLinecap="round" />
        </svg>
        <span className="sm:hidden">Search stays</span>
      </button>
    </div>
  );
}
