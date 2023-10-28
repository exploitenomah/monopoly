"use client"
import useManageGames from "./_hooks/useManageGames"
import Game from "./_components/BoardGame"
import HomeDefaultDisplay from "./_components/Home"
import useManageKeyInLocalStorage from "./_hooks/useManageKeyInLocalStorage"

function Home() {
  const { games, createNewGame } = useManageGames("MONOPOLY_GAMES", [])
  const [currentGameId, updateCurrentGameId, clearCurrentGameId] =
    useManageKeyInLocalStorage("CURRENT_GAME_ID", null)
  /// existing game ? choose game to play : new game

  if (!currentGameId)
    return (
      <HomeDefaultDisplay
        games={games}
        createNewGame={(newGame) => {
          createNewGame(newGame)
          updateCurrentGameId(newGame.id)
        }}
        updateCurrentGameId={updateCurrentGameId}
      />
    )
  return <Game gameDetails={games.filter((it) => it.id === currentGameId)[0]} />
}

export default function HomeWrapper() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Home />
    </main>
  )
}
