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
import PlayersTitleDeeds from "./PlayersTitleDeeds"
import PlayersAccountBalances from "./PlayersAccountBalances"
import {
  authorize,
  setGame,
  initGame,
  advanceCurrentPlayer,
  sendPrisonersToJail,
  eliminateBankruptPlayers
} from "../_redux/game.slice"
import toast from "react-hot-toast"
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
  const { notification } = useHandleNotification(game)

  useEffect(() => {
    if(game?.players.some(player => player.isInJail && player.currentPosition !== 10)){
      appDispatch(sendPrisonersToJail())
    }
  }, [game, appDispatch])

  useEffect(() => {
    const bankruptPlayersIds = game ?
     game.players.filter(it => BoardGame.checkIfPlayerIsBankrupt(it.id, game) === true).map(it => it.id) : []
    bankruptPlayersIds.length > 0 &&
    appDispatch(eliminateBankruptPlayers(bankruptPlayersIds))
    const bankruptPlayers = game?.players
    .filter(it => bankruptPlayersIds.includes(it.id))
    .reduce((acc, curr, idx) => (`${acc} \n${idx + 1}. ${curr.name}`), "")
    bankruptPlayersIds.length > 0 && toast(`The following players are bankrupt and have been eliminated\n${bankruptPlayers}`)
  }, [game?.players, appDispatch])

  return (
    <div>
      <div style={{ filter: showSideBar ? "blur(3px)" : "" }}>
        <Banner notification={notification} />
      </div>
      <GameNavButton
        toggleShowSideBar={() => setShowSideBar((prev) => !prev)}
      />
      <GameSideBar show={showSideBar} close={() => setShowSideBar(false)} >
        <div>
          <h3 className="sticky top-0 bg-primary-default z-[10] text-2xl capitalize font-bold text-primary-dark text-center p-3">{game?.name}</h3>
          <PlayersAccountBalances game={game} />
          <PlayersTitleDeeds game={game}/>
        </div>
      </GameSideBar>
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
