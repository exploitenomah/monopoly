import { useState, useEffect } from "react"
import BoardGame from "../_classes/BoardGame"

export default function useHandleNotification(game: BoardGame | null) {
  const [notification, setNotification] = useState<string>("")

  useEffect(() => {
    setNotification(
      `${
        game?.players.filter((it) => it.turn === game?.currentTurn)[0]?.name
      }'s turn`
    )
  }, [game])
  return {
    notification,
  }
}
