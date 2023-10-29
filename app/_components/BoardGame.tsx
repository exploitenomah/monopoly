import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"
import AuthorizationForm from "./AuthorizationForm"

export default function GameBoard({
  gameDetails,
  clearCurrentGameId,
  createNewGame
}: {
  gameDetails: GameDetails
  clearCurrentGameId: () => void
  createNewGame: () => void
}) {
  const { game, isAuthorized, authorizeToPlay } =
    useSingleGameManager(gameDetails)

  if (!isAuthorized)
    return <AuthorizationForm verifyPassword={authorizeToPlay} gameDetails={gameDetails} resetToDefaultView={clearCurrentGameId} createNewGame={createNewGame} />
    
  return (
    <div style={{ perspective: "1000px" }}>
      <Board game={game} />
    </div>
  )
}
