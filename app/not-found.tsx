import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl">Requested page not found</p>
      <button className="btn btn-primary">
        <Link href="/">Go to Home</Link>
      </button>
    </div>
  );
}
