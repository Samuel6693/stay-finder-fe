import PropertyList from "@/components/PropertyList";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-[#dde2dc] bg-[#e7efe9]">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#d1e3d9] blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#f4d8bc]/60 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#1f6f50]">Find your next place</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-[#18201b] sm:text-5xl lg:text-6xl">
            Stay somewhere that feels worth remembering.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#566159] sm:text-lg">
            Discover hand-picked homes across Sweden, from quiet forest cabins to city apartments by the water.
          </p>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <PropertyList searchParams={searchParams} />
      </div>
    </main>
  );
}
