import Space from "@/app/_classes/Space"
import Image from "next/image"

export default function CommunityChestTile({
  classType,
}: {
  classType: Space
}) {
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <Image
        src="/image-files/community-chest.svg"
        width={60}
        height={60}
        alt="community chest"
      />
    </div>
  )
}
