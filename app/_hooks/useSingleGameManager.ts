import { useEffect } from "react"
import useGenerateGame from "./useGenerateGame"
import { GameDetails } from "../types"
import BoardGame from "@/app/_classes/BoardGame"

export default function useSingleGameManager({
  game,
  gameDetails,
  setGame,
}: {
  game: BoardGame | null
  gameDetails: GameDetails
  setGame: (newGame: BoardGame) => void
}) {
  const createNewGame = useGenerateGame(gameDetails)

  useEffect(() => {
    if (game !== null) {
      if (gameDetails.id === game.id) {
        localStorage.setItem(gameDetails.id, JSON.stringify(game))
      }
    }
  }, [game, gameDetails.id])

  useEffect(() => {
    const gameInLocalStorage = localStorage.getItem(gameDetails.id)
    if (gameInLocalStorage !== null) setGame(JSON.parse(gameInLocalStorage))
    else {
      setGame(JSON.parse(JSON.stringify(createNewGame())) as BoardGame)
    }
  }, [gameDetails.id, createNewGame])
}
