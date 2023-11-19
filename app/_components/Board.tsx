import LineOne from "./Lines/LineOne"
import LineTwo from "./Lines/LineTwo"
import LineThree from "./Lines/LineThree"
import LineFour from "./Lines/LineFour"
import Go from "./Spaces/Go"
import Jail from "./Spaces/Jail"
import FreeParking from "./Spaces/FreeParking"
import GoToJail from "./Spaces/GoToJail"
import BoardGame from "@/app/_classes/BoardGame"
import BoardCenter from "./BoardCenter"

export default function Board({
  game,
  advanceCurrentPlayer,
}: {
  advanceCurrentPlayer: (advancement: number, isDouble: boolean) => void
  game: BoardGame | null
}) {
  if (!game) return <></>
  return (
    <div className="board bg-primary-default h-[100vw] w-[100vw] sm:h-[85vw] sm:w-[85vw] md:h-[80vw] md:w-[80vw] lg:h-[100vh] lg:w-[100vh] relative">
      <LineOne tiles={game.properties[1]} />
      <Jail jail={game.Jail} />
      <LineTwo tiles={game.properties[2]} />
      <FreeParking freeParking={game.FreeParking} />
      <LineThree tiles={game.properties[3]} />
      <GoToJail goToJail={game.GoToJail} />
      <LineFour tiles={game.properties[4]} />
      <Go go={game.Go} />
      <BoardCenter advanceCurrentPlayer={advanceCurrentPlayer} game={game} />
    </div>
  )
}
