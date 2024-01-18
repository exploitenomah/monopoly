import { useEffect, useState } from "react";
import BoardGame from "../_classes/BoardGame";
import useHandleNotification from "../_hooks/useHandleNotifications";
import Toggle from "./Toggle";
import useAnnounce from "../_hooks/useAnnounce";


export default function TurnAnnouncer({ game }: {
  game: BoardGame | null
}){
  const { announce, canAnnounce } = useAnnounce()
  const { notification, playerInTurn } = useHandleNotification(game)
  const [announceTurn, setAnnounceTurn] = useState(false)
  useEffect(() => {
    if (announceTurn) {
      announce(notification)
    }
  }, [notification, announceTurn])
  return (
    <div className="text-red-900 w-full font-bold text-[1.8vmin] leading-[1.5] flex flex-col items-center">
      <p className="text-lg uppercase" style={{ color: playerInTurn?.color as string}}>{notification}</p>
      { canAnnounce &&
        <div className="flex flex-col justify-center items-center gap-x-3 lowercase text-primary-dark">
          <p className="text-xs">{!announceTurn && <>don't</>} speak turn</p>
          <Toggle checked={announceTurn} handleChange={() => (setAnnounceTurn(prev => !prev))} />
        </div>
      }
    </div>
  )
}