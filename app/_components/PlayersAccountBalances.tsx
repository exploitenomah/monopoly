import BoardGame from "../_classes/BoardGame"
import { useMemo } from "react"
import PlayerAccountBalance from "./PlayerAccountBalance"

export default function PlayersAccountBalances({ game }: { game: BoardGame | null }) {

  const accountBalances = useMemo(() => (game?.players?.map((player) => (
    <PlayerAccountBalance
      key={player.id}
      player={player}
    />
  )
  )), [game?.players])

  if (!game) return null
  return (
    <div className="w-full p-4">
      <ul className="px-4 overflow-x-auto flex flex-wrap gap-5 sticky top-0">
        {accountBalances}
      </ul>
    </div>
  )
}
