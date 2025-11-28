export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-12 animate-pulse">
        <div className="h-[320px] rounded-3xl bg-neutral-900" />

        <div className="space-y-4">
          <div className="h-10 w-1/2 rounded bg-neutral-900" />
          <div className="h-4 w-2/3 rounded bg-neutral-900" />
          <div className="h-4 w-1/2 rounded bg-neutral-900" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`card-${index}`}
              className="space-y-4 rounded-xl border border-neutral-800 p-6"
            >
              <div className="h-32 rounded bg-neutral-900" />
              <div className="h-6 w-3/4 rounded bg-neutral-900" />
              <div className="h-4 w-full rounded bg-neutral-900" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
