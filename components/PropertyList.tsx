import PropertyCard from "./PropertyCard";
import { getProperties, PropertiesFilter } from "@/utils/propertyService";
import PropertyFilter from "./PropertyFilter";
import T from "./typography";

type PropertyListProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PropertyList({
  searchParams,
}: PropertyListProps) {
  const location = (await searchParams).location?.toString() || "";
  const maxprice = (await searchParams).maxprice?.toString() || "";
  const maxguests = (await searchParams).maxguests?.toString() || "";
  const sort = (await searchParams).sort?.toString() || "";
  const propertiesFilter: PropertiesFilter = {
    location,
    maxPrice: maxprice ? Number(maxprice) : undefined, // Convert maxPrice to a number if it's provided
    maxGuests: maxguests ? Number(maxguests) : undefined, // Convert maxGuests to a number if it's provided
    sort,
  };
  const properties = await getProperties(propertiesFilter);
  return (
    <div className="flex flex-col gap-10">
      <div className="relative z-10 -mt-20 flex flex-col gap-5 sm:-mt-24">
        <PropertyFilter filter={propertiesFilter} />
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f6f50]">Explore</p>
          <T.Header size="lg" className="mt-1 text-3xl tracking-[-0.035em] text-[#18201b]">Places to stay</T.Header>
        </div>
        <p className="text-sm text-[#667068]">{properties.length} {properties.length === 1 ? "stay" : "stays"}</p>
      </div>
      {properties.length > 0 ? (
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.property_id} property={property} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#cbd3cc] bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-[#26302a]">No stays match your search</p>
          <p className="mt-2 text-sm text-[#667068]">Try changing or clearing one of the filters.</p>
        </div>
      )}
    </div>
  );
}
