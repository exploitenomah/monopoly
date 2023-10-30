import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"
import AuthorizationForm from "./AuthorizationForm"
import InitializationForm from "./InitializationDisplay"
import GameNavButton from "./GameNavButton"
import GameSideBar from "./GameSideBar"
import { useState } from "react"
import BoardGame from "../_classes/BoardGame"

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

  return <MainGame game={game} />
}

function MainGame({ game }: { game: BoardGame }) {
  const [showSideBar, setShowSideBar] = useState(false)
  return (
    <>
      <GameNavButton
        toggleShowSideBar={() => setShowSideBar((prev) => !prev)}
      />
      <GameSideBar show={showSideBar} close={() => setShowSideBar(false)} />
      <div style={{ perspective: "1000px" }}>
        <Board game={game} />
      </div>
    </>
  )
}
