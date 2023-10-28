import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"

export default function GameBoard({
  gameDetails,
}: {
  gameDetails: GameDetails
}) {
  const { game } = useSingleGameManager(gameDetails)

  return (
    <div style={{ perspective: "1000px" }}>
      <Board game={game} />
    </div>
  )
}
