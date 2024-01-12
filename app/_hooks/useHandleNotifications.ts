import { useState, useEffect } from "react"
import BoardGame from "../_classes/BoardGame"
import Player from "../_classes/Player"

export default function useHandleNotification(game: BoardGame | null) {
  const [notification, setNotification] = useState<string>("")
  const [playerInTurn, setPlayerInTurn] = useState<Player | undefined>(undefined)

  useEffect(() => {
    const currentPlayer = game?.players.filter((it) => it.turn === game?.currentTurn)[0]
    if(currentPlayer){
      setPlayerInTurn(currentPlayer)
      setNotification(
        `${
          currentPlayer?.name
        }'s turn`
      )
    }
  }, [game])
  return {
    notification,
    playerInTurn
  }
}
