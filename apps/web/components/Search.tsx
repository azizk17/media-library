import { Input } from "ui/components/input";

export function Search() {
  return (
    <div className="">
      <Input
        type="search"
        placeholder="Search..."
        className="h-9 md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
