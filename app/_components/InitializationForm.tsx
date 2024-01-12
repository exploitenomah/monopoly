import { useState, useCallback, FormEventHandler, useMemo } from "react"
import { PlayerColor, PlayerDetail } from "../types"
import useDice from "../_hooks/useDice"
import Dice from "./Dice"
import useGetRandomName from "../_hooks/useGetRandomName"
import { names } from "unique-names-generator"

export default function Form({
  colorOptions,
  currentPlayer,
  handlePlayerDetail,
  takenNames,
}: {
  colorOptions: PlayerColor[]
  currentPlayer: number
  handlePlayerDetail: (data: PlayerDetail) => void
  takenNames: string[]
}) {
  const getRandomName = useGetRandomName({ dictionaries: [names] })
  const diceOne = useDice(500)
  const diceTwo = useDice(500)
  const [error, setError] = useState("")
  const [playerDetails, setPlayerDetails] = useState<PlayerDetail>({
    name: "",
    color: colorOptions[0] as PlayerColor,
    rollValue: NaN,
  })
  const [hasRolled, setHasRolled] = useState(false)

  const handleChange = useCallback((name: any, value: any) => {
    setError("")
    setPlayerDetails((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      if (takenNames.includes(playerDetails.name.toLowerCase()))
        return setError("Name is already taken!")
      else if (playerDetails.name.length < 1)
        return setError("Please input your name!")
      else if (playerDetails.color.length < 1)
        return setError("Please pick a color!")
      else if (isNaN(diceOne.rollValue) || isNaN(diceTwo.rollValue))
        return setError("Dies must be rolled!")
      else {
        handlePlayerDetail({
          ...playerDetails,
          rollValue: diceOne.rollValue + diceTwo.rollValue,
        })
        setPlayerDetails({
          name: "",
          color: colorOptions.filter(it => it.toLocaleLowerCase() !== playerDetails.color.toLocaleLowerCase())[0] as PlayerColor,
          rollValue: NaN,
        })
        setHasRolled(false)
        diceOne.reset()
        diceTwo.reset()
      }
    },
    [
      playerDetails,
      handlePlayerDetail,
      diceOne,
      diceTwo,
      takenNames,
      colorOptions[0]
    ]
  )

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-2">
        <h2 className="text-center font-bold text-xl">
          Enter Your Details Player {currentPlayer}
        </h2>
        <span className="text-center w-full text-red-500">{error}</span>
        <label className="flex w-full flex-col gap-y-1">
          What is your name player {currentPlayer}
          <input
            value={playerDetails.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-lg bg-transparent invalid:focus:border-red-600 py-[0.83rem] px-[1rem] border-solid border border-primary-dark focus:border-dotted focus:border-blue-600 focus:outline-0"
          />
          <button
            type="button"
            onClick={() => {
              handleChange("name", getRandomName())
            }}
            className="self-end text-blue-800"
          >
            get random name
          </button>
        </label>
        <label className="flex w-full flex-col gap-y-1">
          Pick a color
          <div className="relative w-full">
            <span
              style={{ background: playerDetails.color }}
              className="absolute block right-[5%] top-1/2 -translate-y-1/2 rounded-full w-[30px] h-[30px]"
            ></span>
            <select
              onChange={(e) =>
                handleChange("color", e.target.value as PlayerColor)
              }
              value={playerDetails.color}
              className="rounded-lg bg-transparent invalid:focus:border-red-600 py-[0.83rem] px-[1rem] border-solid border border-primary-dark focus:border-dotted focus:border-blue-600 focus:outline-0 appearance-none w-full"
            >
              {colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </label>
        <div className="flex flex-col gap-y-12 text-center">
          <h3 className="font-semibold text-md">
            Now Roll the dice. <span> Remember, you can only roll once</span>
          </h3>
          {!isNaN(diceOne.rollValue) && !isNaN(diceTwo.rollValue) && (
            <p className="font-semibold text-md">
              You rolled a total of{" "}
              <b className="font-bold">
                {diceOne.rollValue + diceTwo.rollValue}
              </b>
            </p>
          )}
          <div
            onClick={() => {
              diceOne.roll()
              diceTwo.roll()
              setHasRolled(true)
              setError("")
            }}
            role="button"
            className="flex items-center justify-center gap-x-8 disabled:opacity-50"
            title="dice"
          >
            <Dice
              disabled={hasRolled && !diceOne.isRolling && !diceTwo.isRolling}
              rollValue={diceOne.rollValue}
              isRolling={diceOne.isRolling}
            />
            <Dice
              disabled={hasRolled && !diceOne.isRolling && !diceTwo.isRolling}
              rollValue={diceTwo.rollValue}
              isRolling={diceTwo.isRolling}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-lg font-bold text-[1rem] shadow-2xl hover:scale-[1.03] active:scale-[0.98] bg-primary-dark text-primary-default w-full max-w-[120px] mt-4 ml-auto py-[0.83rem] px-[1rem]"
        >
          Next
        </button>
      </form>
    </>
  )
}
