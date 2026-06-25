export default function AccountLoading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="h-8 w-40 bg-line animate-pulse mb-2" />
      <div className="h-4 w-56 bg-line animate-pulse mb-10" />

      <div className="h-4 w-32 bg-line animate-pulse mb-5" />

      {/* Order cards */}
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-line p-4 space-y-3">
            <div className="flex justify-between">
              <div className="h-3 w-48 bg-line animate-pulse" />
              <div className="h-5 w-20 bg-line animate-pulse rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-2/3 bg-line animate-pulse" />
                <div className="h-4 w-16 bg-line animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-1/2 bg-line animate-pulse" />
                <div className="h-4 w-16 bg-line animate-pulse" />
              </div>
            </div>
            <div className="border-t border-line pt-2 flex justify-between">
              <div className="h-4 w-12 bg-line animate-pulse" />
              <div className="h-4 w-20 bg-line animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}