export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-4xl animate-pulse space-y-8">
        <div className="h-10 w-40 rounded bg-neutral-900" />

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 space-y-6">
          <div className="h-96 w-full rounded-lg bg-neutral-900" />

          <div className="space-y-4">
            <div className="h-10 w-3/4 rounded bg-neutral-900" />
            <div className="h-4 w-1/4 rounded bg-neutral-800" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`paragraph-${index}`}
                className="h-4 w-full rounded bg-neutral-900"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
