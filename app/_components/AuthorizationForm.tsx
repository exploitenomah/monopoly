import { useState, useCallback, FormEventHandler } from "react"
import { GameDetails } from "../types"
import { IntroMusicPlayer } from "./BackgroundMusic"

export default function AuthorizationForm({
  gameDetails,
  resetToDefaultView,
  createNewGame,
  verifyPassword,
}: {
  gameDetails: GameDetails
  resetToDefaultView: () => void
  createNewGame: () => void
  verifyPassword: (password: string) => void
}) {
  const [password, setPassword] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      verifyPassword(password)
      setIsPasswordWrong(true)
    },
    [password, verifyPassword]
  )

  return (
    <div className="bg-primary-default text-primary-dark rounded-lg px-6 py-12 w-[95vw] max-w-[580px] min-h-[600px]">
      <h1 className="text-3xl text-center mb-5">
        Continue from where you left off!
      </h1> <IntroMusicPlayer />
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="flex flex-col items-start gap-y-2">
          <span className="text-xl font-normal">
            Enter the password for{" "}
            <span className="font-bold text-lg">{gameDetails.name}</span>
          </span>
          <input
            type="password"
            onChange={(e) => {
              isPasswordWrong && setIsPasswordWrong(false)
              setPassword(e.target.value)
            }}
            value={password}
            className={`${
              isPasswordWrong ? "!border-red-600 !border-solid" : ""
            } rounded-lg w-full py-[0.83rem] px-[1rem] border-2 border-solid border-primary-dark bg-transparent invalid:focus:border-red-600 focus:border-dotted focus:border-blue-600 focus:outline-0`}
          />
        </label>
        <button className="block rounded-lg font-bold text-[1rem] shadow-2xl hover:scale-[1.03] active:scale-[0.98] bg-primary-dark text-primary-default w-full max-w-[200px] mx-auto my-3 py-[0.83rem] px-[1rem]">
          Continue Game
        </button>
      </form>
      <div className="flex flex-col items-start w-full mt-8 gap-y-4">
        <h3 className="text-lg font-medium text items-center">
          Not your game?
        </h3>
        <div className="flex justify-between w-full items-center">
          <button
            className="text-green-900 underline"
            onClick={resetToDefaultView}
          >
            Find your game
          </button>
          <span className="font-bold text-md text-primary-dark no-underline">
            or
          </span>
          <button onClick={createNewGame} className="text-green-900 underline">
            Create a new game
          </button>
        </div>
      </div>
    </div>
  )
}
