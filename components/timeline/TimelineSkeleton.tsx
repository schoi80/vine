export function TimelineSkeleton() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="absolute top-0 right-4 bottom-0 w-0.5 bg-neutral-200 md:right-auto md:left-1/2 md:-ml-px dark:bg-neutral-800" />
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="relative mb-12">
          <div className="mb-2 h-6 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-28 w-full max-w-xl animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900" />
        </div>
      ))}
    </div>
  );
}
