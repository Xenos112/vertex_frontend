import { Loader2 } from "lucide-react";

export default function MainPageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 size={40} className="animate-spin" />
    </div>
  );
}
