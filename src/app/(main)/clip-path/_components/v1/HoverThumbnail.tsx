import CardClipPath from "@/app/(main)/clip-path/_components/v1/CardClipPath";

export default function HoverThumbnail() {
  return (
    <div className="xsm:mt-6 xsm:grid-cols-1 xsm:gap-x-0 xsm:gap-y-6 xsm:px-4 mt-10 grid grid-cols-1 gap-y-[1rem]">
      {Array.from({ length: 6 }).map((item, index) => (
        <CardClipPath key={index} />
      ))}
    </div>
  );
}
