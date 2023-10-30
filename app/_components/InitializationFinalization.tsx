

import {  PlayerDetail } from "../types"

export default 
function Finalization({
  highestRoller,
  finalize,
  restart,
  players,
  isATie,
}: {
  highestRoller: PlayerDetail | null
  finalize: () => void
  restart: () => void
  players: PlayerDetail[]
  isATie: boolean
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-y-6">
      <h2 className="text-center font-bold text-xl">
        {isATie ? "Restart " : "Finalize "}Initialization
      </h2>
      {!isATie ? (
        <p>
          The player with the highest roll is <b>{highestRoller?.name} </b>with
          a roll value of <b>{highestRoller?.rollValue}</b>
        </p>
      ) : (
        <p>It&apos;s a tie</p>
      )}
      <ul>
        {players.map((player) => (
          <li
            key={player.color}
            className="flex items-center gap-x-2 justify-between"
          >
            <span
              className="block w-4 h-4 rounded-full"
              style={{ background: player.color }}
            ></span>
            <p>{player.name}</p> <p>{player.rollValue}</p>
          </li>
        ))}
      </ul>
      {!isATie && (
        <>
          <b>
            Note: Once player details are submitted, they cannot be changed.
          </b>
          <button
            onClick={finalize}
            type="button"
            className="rounded-lg font-bold text-[1rem] shadow-2xl hover:scale-[1.03] active:scale-[0.98] bg-primary-dark text-primary-default mx-auto w-full max-w-[250px] mt-4 ml-auto py-[0.83rem] px-[1rem]"
          >
            Finalize Initialization
          </button>
        </>
      )}
      <button className="underline text-md" onClick={restart}>
        restart initialization
      </button>
    </div>
  )
}
