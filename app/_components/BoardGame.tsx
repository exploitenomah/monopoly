import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"
import AuthorizationForm from "./AuthorizationForm"
import InitializationForm from "./InitializationDisplay"
import GameNavButton from "./GameNavButton"
import GameSideBar from "./GameSideBar"
import { useState , useEffect } from "react"
import Banner from "./Banner"
import useHandleNotification from "../_hooks/useHandleNotifications"
import { useAppSelector, useAppDispatch } from "../_redux/hooks"
import {
  authorize,
  setGame,
  initGame,
  advanceCurrentPlayer,
  sendPrisonersToJail
} from "../_redux/game.slice"

export default function GameBoard({
  gameDetails,
  clearCurrentGameId,
  createNewGame,
}: {
  gameDetails: GameDetails
  clearCurrentGameId: () => void
  createNewGame: () => void
}) {
  const { game, isAuthorized } = useAppSelector((store) => store.Game)
  const appDispatch = useAppDispatch()
  useSingleGameManager({
    gameDetails,
    game,
    setGame: (newGame) => {
      appDispatch(setGame(newGame))
    },
  })

  if (!game) return <></>

  if (!isAuthorized && game.isInitialized === true)
    return (
      <AuthorizationForm
        verifyPassword={(password: string) => appDispatch(authorize(password))}
        gameDetails={gameDetails}
        resetToDefaultView={clearCurrentGameId}
        createNewGame={createNewGame}
      />
    )

  if (game.isInitialized === false)
    return (
      <InitializationForm
        finalize={(playersDetails) => appDispatch(initGame(playersDetails))}
        totalPlayers={game?.players.length}
      />
    )

  return <MainGame />
}

function MainGame() {

  const { game } = useAppSelector((store) => store.Game)
  const appDispatch = useAppDispatch()
  const [showSideBar, setShowSideBar] = useState(false)
  const { notifications } = useHandleNotification(game)

  useEffect(() => {
    if(game?.players.some(player => player.isInJail && player.currentPosition !== 10)){
      appDispatch(sendPrisonersToJail())
    }
  }, [game, appDispatch])
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
        <Board
          advanceCurrentPlayer={(rollValue, isDouble) =>
            appDispatch(advanceCurrentPlayer({ rollValue, isDouble }))
          }
          game={game}
        />
      </div>
    </div>
  )
}
