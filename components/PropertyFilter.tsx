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
    <input
      type="search"
      value={search}
      placeholder="Location"
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-300"
    />
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

  return (
    <div className="flex gap-2">
      <Searchbar search={search} setSearch={setSearch} />
      <input
        type="number"
        min={1}
        value={maxPrice}
        placeholder="Max price"
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-32 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-300"
      />

      <input
        type="number"
        min={1}
        value={maxGuests}
        placeholder="Guests"
        onChange={(e) => setMaxGuests(e.target.value)}
        className="w-28 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-300"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-300"
      >
        <option value="">Sort by</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
      </select>

      <button
        type="button"
        onClick={onFiltering}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Filter
      </button>
    </div>
  );
}
