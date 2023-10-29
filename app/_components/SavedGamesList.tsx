import { GameDetails } from "../types"

export default function SavedGamesList({
  games,
  startGame,
}: {
  games: GameDetails[]
  startGame: (id: string) => void
}) {
  if (games.length === 0) return null
  return (
    <div className="rounded-lg w-[85vw] max-w-[600px] mx-auto border border-solid border-primary-default py-[3rem] px-[1rem] md:px-[1.4rem]">
      <h2 className="sticky top-0 bg-primary-dark font-semibold text-2xl text-center mb-2">
        Ongoing Games
      </h2>
      <ul className="h-[390px] overflow-auto capitalize text-[1.2rem] font-medium flex flex-col items-start text-left gap-y-3">
        {games.map((game) => (
          <GameItem key={game.id} startGame={startGame} {...game} />
        ))}
      </ul>
    </div>
  )
}

function GameItem({
  name,
  id,
  startGame,
  totalPlayers,
}: GameDetails & { startGame: (id: string) => void }) {
  return (
    <li className="flex flex-wrap w-full items-end border-b border-b-solid border-b-primary-default]">
      <div className="flex flex-col items-start">
        <span className="whitespace-nowrap">{name}</span>
        <small className="">{totalPlayers} players</small>
      </div>
      <button onClick={() => startGame(id)} className="ml-auto">
        <span>resume</span>
      </button>
    </li>
  )
}
