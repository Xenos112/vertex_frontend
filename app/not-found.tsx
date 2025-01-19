import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return <div className="flex h-screen flex-col gap-4 items-center justify-center">
    <h1 className="text-4xl font-bold">404</h1>
    <p className='text-2xl'>Requested page not found</p>
    <Button>
      <Link href="/">
        Go to Home
      </Link>
    </Button>
  </div>
}
