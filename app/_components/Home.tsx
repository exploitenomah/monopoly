import { GameDetails } from "../types"
import SavedGamesList from "./SavedGamesList"
import NewGameForm from "./NewGameForm"
import Image from "next/image"
import { useState, useRef } from "react"
import useOutsideClick from "../_hooks/useOutsideClick"

export default function Home({
  games,
  createNewGame,
  updateCurrentGameId,
  showGameCreationFormByDefault
}: {
  showGameCreationFormByDefault: boolean
  games: GameDetails[]
  createNewGame: ({
    name,
    password,
    totalPlayers,
    id,
  }: {
    name: string
    password: string
    totalPlayers: number
    id: string
  }) => void
  updateCurrentGameId: (newGameId: string) => void
}) {
  const [showNewGameForm, setShowNewGameForm] = useState(showGameCreationFormByDefault)
  const newGameFormRef = useRef<HTMLFormElement | null>(null)
  useOutsideClick(newGameFormRef, () => setShowNewGameForm(false))

  return (
    <>
      <NewGameForm
        handleSubmit={createNewGame}
        formRef={newGameFormRef}
        show={showNewGameForm}
        close={() => setShowNewGameForm(false)}
      />
      <div
        className={`${
          showNewGameForm
            ? "blur-[10px] brightness-[0.4]"
            : "blur-0 brightness-[100%]"
        } flex flex-col items-center justify-center min-h-[75%] gap-y-[2rem]`}
      >
        <div className="flex items-center justify-center flex-wrap gap-y-1 gap-x-2">
          <h1 className="text-center font-light text-2xl md:text-3xl lg:text-5xl">
            Welcome to Port Harcourt
          </h1>
          <Image
            src="/image-files/monopoly-logo.svg"
            alt="monopoly"
            width={350}
            height={350}
          />
          {games.length <= 0 && (
            <span className="w-full text-center text-md md:text-xl font-bold underline mt-[20px]">
              No Available Games
            </span>
          )}
        </div>
        <div className="w-full">
          <SavedGamesList startGame={updateCurrentGameId} games={games} />
          {games.length === 0 && (
            <Image
              src="/image-files/monopoly-man.png"
              alt="monopoly"
              width={350}
              height={350}
              className="rounded-full mb-6 mx-auto"
            />
          )}
          <button
            disabled={showNewGameForm}
            onClick={() => setShowNewGameForm((prev) => !prev)}
            className="mt-5 text-center block w-full max-w-[235px] py-[0.83rem] px-[1rem] text-primary-dark/80 bg-primary-default capitalize font-bold text-[1.2rem] rounded-lg mx-auto shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all "
          >
            Start A New Game
          </button>
        </div>
      </div>
    </>
  )
}
