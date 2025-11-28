export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 w-48 rounded bg-neutral-900" />
          <div className="h-6 w-1/2 rounded bg-neutral-900" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`feature-${index}`}
              className="space-y-4 rounded-xl border border-neutral-800 p-6"
            >
              <div className="h-48 rounded bg-neutral-900" />
              <div className="h-6 w-3/4 rounded bg-neutral-900" />
              <div className="h-4 w-full rounded bg-neutral-900" />
              <div className="h-4 w-5/6 rounded bg-neutral-900" />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`paragraph-${index}`}
              className="h-4 w-full rounded bg-neutral-900"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
