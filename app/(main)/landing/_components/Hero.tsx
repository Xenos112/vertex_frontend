import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";

export default function Hero() {
  return (
    <div className="mx-auto flex h-[50vh] max-w-[1000px] flex-col items-center justify-center gap-8">
      <div className="mx-auto flex w-fit flex-col items-center gap-4">
        <Typography as="h1" variant="title" className="text-center">
          Explore More in Your Domain <br />
          with counter less communities
        </Typography>

        <Typography as="h2" variant="sub-title" className="text-center">
          join and communicate with different users from your favorite domain
        </Typography>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button className="flex-col">login now</Button>
        <Button variant="outline" className="flex-col">
          join communities
        </Button>
      </div>
    </div>
  );
}
