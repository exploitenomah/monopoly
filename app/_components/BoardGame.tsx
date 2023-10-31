import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"
import AuthorizationForm from "./AuthorizationForm"
import InitializationForm from "./InitializationDisplay"
import GameNavButton from "./GameNavButton"
import GameSideBar from "./GameSideBar"
import { useState } from "react"
import Banner from "./Banner"
import useHandleNotification from "../_hooks/useHandleNotifications"
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

  return <MainGame gameDetails={gameDetails} />
}

function MainGame({ gameDetails }: { gameDetails: GameDetails }) {
  const { game, advanceCurrentPlayer } = useSingleGameManager(gameDetails)
  const [showSideBar, setShowSideBar] = useState(false)
  const { notifications } = useHandleNotification(game)
  return (
    <div>
      <div style={{ filter: showSideBar ? "blur(3px)" : "" }}>
        <Banner notification={notifications[notifications.length - 1]} />
      </div>
      <GameNavButton
        toggleShowSideBar={() => setShowSideBar((prev) => !prev)}
      />
      <GameSideBar show={showSideBar} close={() => setShowSideBar(false)} />
      <div
        style={{
          perspective: "1000px",
          filter: showSideBar ? "blur(3px)" : "",
        }}
      >
        <Board advanceCurrentPlayer={advanceCurrentPlayer} game={game} />
      </div>
    </div>
  )
}
