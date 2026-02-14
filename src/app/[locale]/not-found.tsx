import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-[4rem] font-medium tracking-[-0.06em] text-black">
        404
      </h1>
      <p className="mt-4 text-lg tracking-[-0.03em] text-black/60 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 flex items-center justify-center px-7 py-3.5 text-base font-medium tracking-[-0.04em] text-white bg-black rounded-full transition-colors duration-200 hover:bg-black/85"
      >
        Go home
      </Link>
    </section>
  );
}
