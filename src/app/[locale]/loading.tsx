export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" aria-busy="true" aria-label="Loading page">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-black/60 animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
