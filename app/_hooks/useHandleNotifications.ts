import { useState, useEffect } from "react"
import BoardGame from "../_classes/BoardGame"

export default function useHandleNotification(game: BoardGame | null) {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    setNotifications((prev) => [
      ...prev,
      `${
        game?.players.filter((it) => it.turn === game?.currentTurn)[0]?.name
      }'s turn`,
    ])
  }, [game])
  return {
    notifications,
  }
}
