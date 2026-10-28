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
  const propertiesFilter: PropertiesFilter = {
    location,
    maxPrice: maxprice ? Number(maxprice) : undefined, // Convert maxPrice to a number if it's provided
    maxGuests: maxguests ? Number(maxguests) : undefined, // Convert maxGuests to a number if it's provided
  };
  const properties = await getProperties(propertiesFilter);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <T.Header size="lg">Places to stay</T.Header>
        <PropertyFilter filter={propertiesFilter} />
      </div>
      <div className="flex flex-col gap-3">
        {properties.map((property) => (
          <PropertyCard key={property.property_id} property={property} />
        ))}
      </div>
    </div>
  );
}
