import StationProperty from "@/app/_classes/StationProperty"
import Image from "next/image"

export default function StationTile({
  classType,
}: {
  classType: StationProperty
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-[3px] border border-x-solid border-x-black">
      <span>{classType.name} Motors</span>
      <Image
        src="/image-files/bus.svg"
        width={25}
        height={25}
        alt="community chest"
      />
      <span>₦ {classType.price}</span>
    </div>
  )
}
