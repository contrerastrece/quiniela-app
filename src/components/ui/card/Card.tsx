import Image from "next/image";

type Props = {
  url: string;
  shortName: string;
};
export const Card = ({ url, shortName }: Props) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src={url || "/shield.png"}
        alt={shortName || ""}
        className="object-contain bg-white rounded-md p-1"
        width={50}
        height={50}
        loading="lazy"
      />
      <p className="w-full text-xs text-white text-wrap text-center ">
        {shortName}
      </p>
    </div>
  );
};
