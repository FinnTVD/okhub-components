import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <Image
        src="/background-okhub.jpg"
        alt="logo"
        width={1600}
        height={800}
        className="size-full object-cover"
      />
    </div>
  );
}
