import { useEffect, useState, useCallback } from "react"
import useGenerateGame from "./useGenerateGame"
import useEncryptAndDecrypt from "./useEncryptAndDecrypt"
import { GameDetails } from "../types"
import BoardGame from "@/app/_classes/BoardGame"

export default function useSingleGameManager(gameDetails: GameDetails) {
  const { decrypt } = useEncryptAndDecrypt(
    process.env.NEXT_PUBLIC_JS_CRYPTO_KEY as string
  )
  const createNewGame = useGenerateGame(gameDetails)
  const [game, setGame] = useState<BoardGame | null>(null)
  // const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (game !== null) {
      localStorage.setItem(gameDetails.id, JSON.stringify(game))
    }
  }, [game, gameDetails.id])

  useEffect(() => {
    const gameInLocalStorage = localStorage.getItem(gameDetails.id)
    if (gameInLocalStorage !== null)
      setGame(BoardGame.revive(JSON.parse(gameInLocalStorage)))
    else setGame(createNewGame())
  }, [gameDetails.id, createNewGame])

  return {
    game,
    // authorizeToPlay,
  }
}