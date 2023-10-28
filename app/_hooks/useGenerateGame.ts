import { GameDetails } from "../types"
import { useCallback } from "react"
import BoardGame from "@/app/_classes/BoardGame"

export default function useGenerateGame(gameDetails: GameDetails) {
  const { name, id, password, totalPlayers } = gameDetails
  return useCallback(() => {
    return new BoardGame(name, id, password, totalPlayers)
  }, [name, id, password, totalPlayers])
}
