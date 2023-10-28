import BoardGame from "@/app/_classes/BoardGame"
import CommunityChestContainer from "./GameCards/CommunityChestContainer"
import ChanceContainer from "./GameCards/ChanceContainer"

export default function BoardCenter({ game }: { game: BoardGame }) {
  const communityChestCards = game.communityChestCards
  const chanceCards = game.chanceCards

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] ">
      <CommunityChestContainer cards={communityChestCards} />
      <ChanceContainer cards={chanceCards} />
    </div>
  )
}
