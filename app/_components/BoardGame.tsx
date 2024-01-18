import Board from "./Board"
import useSingleGameManager from "../_hooks/useSingleGameManager"
import { GameDetails } from "../types"
import AuthorizationForm from "./AuthorizationForm"
import InitializationForm from "./InitializationDisplay"
import GameNavButton from "./GameNavButton"
import GameSideBar from "./GameSideBar"
import { useState , useEffect } from "react"
import Banner from "./Banner"
import { useAppSelector, useAppDispatch } from "../_redux/hooks"
import PlayersTitleDeeds from "./PlayersTitleDeeds"
import PlayersAccountBalances from "./PlayersAccountBalances"
import {
  authorize,
  setGame,
  initGame,
  advanceCurrentPlayer,
  sendPrisonersToJail,
  eliminateBankruptPlayers,
  pauseCurrentGame
} from "../_redux/game.slice"
import toast from "react-hot-toast"
import BoardGame from "../_classes/BoardGame"
import TurnAnnouncer from "./TurnAnnouncer"
import { MainMusicPlayer } from "./BackgroundMusic"

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

  return <MainGame pauseGame={() => {
    clearCurrentGameId()
    appDispatch(pauseCurrentGame())
  }} />
}

function MainGame({ pauseGame }: {
  pauseGame: () => void
}) {

  const { game } = useAppSelector((store) => store.Game)
  const appDispatch = useAppDispatch()
  const [showSideBar, setShowSideBar] = useState(false)

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
        <Banner>
          <div className="flex gap-3 w-full items-center flex-wrap">
            <div className="relative grow shrink-0 max-w-full">
              <PlayersAccountBalances game={game} />
            </div>
            <div className="relative shrink">
              <MainMusicPlayer />
            </div>
            <div className="relative grow shrink-0"><TurnAnnouncer game={game} /></div>
          </div>
        </Banner>
      </div>
      <GameNavButton
        toggleShowSideBar={() => setShowSideBar((prev) => !prev)}
      />
      <GameSideBar show={showSideBar} close={() => setShowSideBar(false)} >
        <div className="flex pt-8 justify-center items-center sticky top-0 bg-primary-default z-[10] ">
          <h3 className="text-2xl capitalize font-bold text-primary-dark text-center">{game?.name}</h3>
          <button 
            onClick={pauseGame}
            className="bg-red-500 rounded-lg px-3 py-2 text-center text-sm font-bold absolute right-[5%]" title="Lock the game temporarily and continue when you are ready">Pause Game</button>
        </div>
        <PlayersTitleDeeds game={game}/>
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
