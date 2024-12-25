import Typography from "@/components/ui/Typography";

export default function Stats() {
  return (
    <div className={"min-h screen flex cursor-pointer items-center justify-center font-bold"}>
      <div className="flex flex-wrap justify-center gap-5">
        <div className="w-64 transform rounded-lg border border-primary bg-black bg-transparent p-6 text-center text-blue-400 transition-transform duration-300 ease-in-out hover:scale-105">
          <Typography variant="title" as="span" className="text-primary">
            +9999
          </Typography>
          <p className="mt-2 text-[24px] text-black">Communities</p>
        </div>

        <div className="w-64 transform rounded-lg border border-primary bg-black bg-transparent p-6 text-center text-blue-400 transition-transform duration-300 ease-in-out hover:scale-105">
          <Typography className="text-primary" as="span" variant="title">
            +9999
          </Typography>
          <p className="mt-2 text-[24px] text-black">Active Users</p>
        </div>

        <div className="w-64 transform rounded-lg border border-primary bg-black bg-transparent p-6 text-center text-blue-400 transition-transform duration-300 ease-in-out hover:scale-105">
          <Typography as="span" variant="title" className="text-primary">
            +9999
          </Typography>
          <p className="mt-2 text-[24px] text-black">posts</p>
        </div>
      </div>
    </div>
  );
}
