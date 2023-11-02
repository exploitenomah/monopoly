import { useEffect, useState, useCallback } from "react"
import useEncryptAndDecrypt from "./useEncryptAndDecrypt"
import { GameDetails } from "../types"

export default function useManageGames(
  localStorageKey: string,
  initialValue: GameDetails[]
) {
  const { encrypt } = useEncryptAndDecrypt(
    process.env.NEXT_PUBLIC_JS_CRYPTO_KEY as string
  )
  const [games, setGames] = useState<GameDetails[]>(initialValue)

  const createNewGame = useCallback(
    ({
      name,
      password,
      totalPlayers,
      id,
    }: {
      name: string
      password: string
      totalPlayers: number
      id: string
    }) => {
      setGames((prev) => {
        let updGames = [
          {
            name,
            id,
            password: encrypt(password),
            totalPlayers,
          },
          ...prev,
        ]
        localStorage.setItem(localStorageKey, JSON.stringify(updGames))
        return updGames
      })
    },
    [encrypt, localStorageKey]
  )

  useEffect(() => {
    const gamesInLocalStorageString = localStorage.getItem(localStorageKey)
    if (gamesInLocalStorageString) {
      const gamesInLocalStorage = JSON.parse(
        gamesInLocalStorageString
      ) as GameDetails[]
      setGames(gamesInLocalStorage)
    }
  }, [localStorageKey])
  return {
    games,
    createNewGame,
  }
}
