import BoardGame from "@/app/_classes/BoardGame"
import CommunityChestContainer from "./GameCards/CommunityChestContainer"
import ChanceContainer from "./GameCards/ChanceContainer"
import Image from "next/image"

export default function BoardCenter({ game }: { game: BoardGame }) {
  const communityChestCards = game.communityChestCards
  const chanceCards = game.chanceCards

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] ">
      <CommunityChestContainer cards={communityChestCards} />
      <Image
        src="/image-files/monopoly-logo.svg"
        alt="monopoly"
        width={300}
        height={100}
        className="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] w-[80%] h-auto"
      />
      <ChanceContainer cards={chanceCards} />
    </div>
  )
}
