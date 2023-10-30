import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"
import AuthorizationForm from "./AuthorizationForm"
import InitializationForm from "./InitializationForm"

export default function GameBoard({
  gameDetails,
  clearCurrentGameId,
  createNewGame,
}: {
  gameDetails: GameDetails
  clearCurrentGameId: () => void
  createNewGame: () => void
}) {
  const { game, isAuthorized, authorizeToPlay, initializeGame } =
    useSingleGameManager(gameDetails)

  if (!game) return <></>

  if (!isAuthorized)
    return (
      <AuthorizationForm
        verifyPassword={authorizeToPlay}
        gameDetails={gameDetails}
        resetToDefaultView={clearCurrentGameId}
        createNewGame={createNewGame}
      />
    )

  if (game?.isInitialized === false)
    return (
      <InitializationForm
        finalize={initializeGame}
        totalPlayers={game?.players.length}
      />
    )

  return (
    <div style={{ perspective: "1000px" }}>
      <Board game={game} />
    </div>
  )
}
