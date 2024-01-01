import BoardGame from "../_classes/BoardGame"
import { useMemo, useState } from "react"
import PlayerAccountBalance from "./PlayerAccountBalance"

export default function PlayersAccountBalances({ game }: { game: BoardGame | null }) {
  const [showAccountBalances, setShowAccountBalances] = useState(false)

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
      <button className="capitalize bg-primary-dark/90 text-primary-default rounded-lg px-4 py-3 font-medium text-lg" onClick={() => setShowAccountBalances(prev => !prev)}>{showAccountBalances ? "hide" : "show"} account balances</button>
      {showAccountBalances &&
        <ul className="px-4 py-6 overflow-x-auto flex flex-wap gap-5 sticky top-0">
          {accountBalances}
        </ul>
      }
    </div>
  )
}
