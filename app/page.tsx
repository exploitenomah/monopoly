"use client"
import useManageGames from "./_hooks/useManageGames"
import Game from "./_components/BoardGame"
import HomeDefaultDisplay from "./_components/Home"
import useManageKeyInLocalStorage from "./_hooks/useManageKeyInLocalStorage"
import { useState, useEffect } from "react"
// import LoadingDisplay from "./_components/LoadingDisplay"

function Home() {
  const { games, createNewGame } = useManageGames("MONOPOLY_GAMES", [])
  const [currentGameId, updateCurrentGameId, clearCurrentGameId] =
    useManageKeyInLocalStorage("CURRENT_GAME_ID", null)
  // const [loading, setLoading] = useState(true)
  const [showGameCreationForm, setShowGameCreationForm] = useState(false)
  const [monopolyVersion, updateMonopolyVersion, deleteMonopolyVersion] =
    useManageKeyInLocalStorage(
      "GAME_VERSION",
      process.env.NEXT_PUBLIC_GAME_VERSION
    )

  useEffect(() => {
    const gameVersion = process.env.NEXT_PUBLIC_GAME_VERSION
    if (monopolyVersion !== gameVersion) {
      localStorage.clear()
      updateMonopolyVersion(gameVersion)
    }
  }, [monopolyVersion, updateMonopolyVersion])
  // useEffect(() => {
  //   const loadingTimeout = setTimeout(() => {
  //     setLoading(false)
  //   }, 1500)

  //   return () => {
  //     clearTimeout(loadingTimeout)
  //   }
  // }, [])

  // if (loading) return <LoadingDisplay />
  if (!currentGameId)
    return (
      <HomeDefaultDisplay
        games={games}
        createNewGame={(newGame) => {
          createNewGame(newGame)
          updateCurrentGameId(newGame.id)
        }}
        showGameCreationFormByDefault={showGameCreationForm}
        updateCurrentGameId={updateCurrentGameId}
      />
    )
  return (
    <Game
      createNewGame={() => {
        clearCurrentGameId()
        setShowGameCreationForm(true)
      }}
      clearCurrentGameId={clearCurrentGameId}
      gameDetails={games.filter((it) => it.id === currentGameId)[0]}
    />
  )
}

export default function HomeWrapper() {
  return (
    <main className="w-screen h-[100dvh] flex justify-center items-center bg-primary-dark overflow-hidden">
      <Home />
    </main>
  )
}
