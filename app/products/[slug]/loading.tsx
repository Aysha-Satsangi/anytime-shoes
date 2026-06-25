export default function ProductLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image gallery skeleton */}
        <div className="space-y-3">
          <div className="aspect-square bg-line animate-pulse" />
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-20 h-20 bg-line animate-pulse" />
            ))}
          </div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-4">
          <div className="h-3 w-24 bg-line animate-pulse" />
          <div className="h-10 w-3/4 bg-line animate-pulse" />
          <div className="h-6 w-28 bg-line animate-pulse" />
          <div className="space-y-2 mt-6">
            <div className="h-4 w-full bg-line animate-pulse" />
            <div className="h-4 w-5/6 bg-line animate-pulse" />
            <div className="h-4 w-4/6 bg-line animate-pulse" />
          </div>
          <div className="h-px w-full bg-line mt-8" />
          {/* Color picker skeleton */}
          <div className="space-y-3 mt-6">
            <div className="h-3 w-16 bg-line animate-pulse" />
            <div className="flex gap-2">
              {[0, 1].map((i) => (
                <div key={i} className="h-9 w-20 bg-line animate-pulse" />
              ))}
            </div>
          </div>
          {/* Size picker skeleton */}
          <div className="space-y-3">
            <div className="h-3 w-16 bg-line animate-pulse" />
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 bg-line animate-pulse" />
              ))}
            </div>
          </div>
          {/* Button skeleton */}
          <div className="h-14 w-full bg-line animate-pulse mt-4" />
        </div>
      </div>
    </main>
  );
}