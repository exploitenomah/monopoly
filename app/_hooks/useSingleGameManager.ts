import { useEffect, useState, useCallback } from "react"
import useGenerateGame from "./useGenerateGame"
import useEncryptAndDecrypt from "./useEncryptAndDecrypt"
import { GameDetails } from "../types"
import BoardGame from "@/app/_classes/BoardGame"
import { PlayerDetail } from "../types"

export default function useSingleGameManager(gameDetails: GameDetails) {
  const { decrypt } = useEncryptAndDecrypt(
    process.env.NEXT_PUBLIC_JS_CRYPTO_KEY as string
  )
  const createNewGame = useGenerateGame(gameDetails)
  const [game, setGame] = useState<BoardGame | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const authorizeToPlay = useCallback(
    (password: string) => {
      if (password === decrypt(game?.password)) {
        setIsAuthorized(true)
        return true
      } else {
        setIsAuthorized(false)
        return false
      }
    },
    [game?.password, decrypt]
  )

  const initializeGame = useCallback((playersDetails: PlayerDetail[]) => {
    setGame((prev) => {
      if (prev !== null) {
        return copyBoardGame(prev).initialize(playersDetails)
      } else return prev
    })
  }, [])

  const advanceCurrentPlayer = useCallback(
    (rollValue: number, isDouble: boolean) => {
      setGame((prev) => {
        if (prev !== null) {
          const gameCopy = copyBoardGame(prev)
          gameCopy.advancePlayer(rollValue, isDouble)
          return gameCopy
        } else return prev
      })
    },
    []
  )

  useEffect(() => {
    if (game !== null) {
      localStorage.setItem(gameDetails.id, JSON.stringify(game))
    }
  }, [game, gameDetails.id])

  useEffect(() => {
    const gameInLocalStorage = localStorage.getItem(gameDetails.id)
    if (gameInLocalStorage !== null)
      setGame(BoardGame.revive(JSON.parse(gameInLocalStorage)))
    else {
      setGame(createNewGame())
      setIsAuthorized(true)
    }
  }, [gameDetails.id, createNewGame])

  return {
    game,
    isAuthorized,
    authorizeToPlay,
    initializeGame,
    advanceCurrentPlayer,
  }
}

function copyBoardGame(game: BoardGame) {
  return BoardGame.revive(JSON.parse(JSON.stringify(game)))
}
