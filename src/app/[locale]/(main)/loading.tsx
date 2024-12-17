import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-[30vh]">
      <div>
        <h1 className="text-xl md:text-5xl font-bold flex items-center text-primary">
          <Image
            className="animation"
            src={"/logo.png"}
            alt="logo"
            width={150}
            height={150}
          />
        </h1>
      </div>
    </div>
  );
}
