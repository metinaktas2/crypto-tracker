import { LoaderCircle } from "lucide-react";

const Loader = (designs) => {
  return (
    <div className={`my-[200px] ${designs} flex justify-center`}>
      <LoaderCircle className="animate-spin text-blue-500 size-8" />
    </div>
  );
};

export default Loader;
