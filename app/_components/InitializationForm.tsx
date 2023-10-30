import { useState, useCallback, FormEventHandler, useMemo } from "react"
import { PlayerColor, PlayerDetail } from "../types"
import useDice from "../_hooks/useDice"
import Dice from "./Dice"

export default function InitializationForm({
  totalPlayers,
  finalize,
}: {
  totalPlayers: number
  finalize: (playersDetails: PlayerDetail[]) => void
}) {
  const [highestRoller, setHighestRoller] = useState<PlayerDetail | null>(null)
  const [currentPosition, setCurrentPosition] = useState(1)
  const [isInitializationStarted, setIsInitializationStarted] = useState(false)
  const [playersDetails, setPlayersDetails] = useState<PlayerDetail[]>([])
  const [isATie, setIsATie] = useState(false)
  const [takenNames, setTakenNames] = useState<string[]>([])
  const colorOptions = useMemo(() => {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ]
    return colors.filter(
      (color) =>
        playersDetails.find((player) => player.color === color) === undefined
    ) as PlayerColor[]
  }, [playersDetails])

  const handlePlayerDetailSubmission = useCallback(
    (playerDetail: PlayerDetail) => {
      if (!highestRoller || highestRoller.rollValue <= playerDetail.rollValue) {
        setHighestRoller(playerDetail)
        if (highestRoller && highestRoller.rollValue === playerDetail.rollValue)
          setIsATie(true)
        else setIsATie(false)
      }
      setTakenNames((prev) => [...prev, playerDetail.name.toLowerCase()])
      setPlayersDetails((prev) => [...prev, playerDetail])
      setCurrentPosition((prev) => prev + 1)
    },
    [highestRoller]
  )
  return (
    <div className="bg-primary-default text-primary-dark rounded-lg px-6 py-12 w-[95vw] max-w-[580px] min-h-[600px]">
      {currentPosition > totalPlayers && (
        <Finalization
          isATie={isATie}
          players={playersDetails}
          highestRoller={highestRoller}
          finalize={() => finalize(playersDetails)}
          restart={() => {
            setCurrentPosition(1)
            setPlayersDetails([])
            setIsInitializationStarted(true)
            setHighestRoller(null)
          }}
        />
      )}
      {currentPosition <= totalPlayers &&
        (isInitializationStarted ? (
          <Form
            handlePlayerDetail={handlePlayerDetailSubmission}
            colorOptions={colorOptions}
            currentPlayer={currentPosition}
            takenNames={takenNames}
          />
        ) : (
          <InitializationInfo
            startInitialization={() => setIsInitializationStarted(true)}
          />
        ))}
    </div>
  )
}

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

function Form({
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
  const initialState = useMemo(() => {
    return {
      name: "",
      color: "" as PlayerColor,
      rollValue: NaN,
    }
  }, [])
  const diceOne = useDice(500)
  const diceTwo = useDice(500)
  const [error, setError] = useState("")
  const [playerDetails, setPlayerDetails] = useState<PlayerDetail>(initialState)
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
        setPlayerDetails(initialState)
        setHasRolled(false)
        diceOne.reset()
        diceTwo.reset()
      }
    },
    [
      playerDetails,
      initialState,
      handlePlayerDetail,
      diceOne,
      diceTwo,
      takenNames,
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
              You rolled a total of {diceOne.rollValue + diceTwo.rollValue}
            </p>
          )}
          <div className="flex items-center justify-around">
            <Dice rollValue={diceOne.rollValue} isRolling={diceOne.isRolling} />
            <Dice rollValue={diceTwo.rollValue} isRolling={diceTwo.isRolling} />
          </div>
          <button
            disabled={hasRolled}
            onClick={() => {
              diceOne.roll()
              diceTwo.roll()
              setHasRolled(true)
              setError("")
            }}
            type="button"
            className="rounded-lg font-bold text-[1rem] shadow-lg shadow-inset hover:scale-[1.03] active:scale-[0.98] underline text-primary-dark w-full max-w-[150px] mx-auto py-[0.83rem] px-[1rem] disabled:bg-gray-300/50 disabled:cursor-not-allowed disabled:active:scale-[1] disabled:hover:scale-[1]"
          >
            Roll
          </button>
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

const pointsToNote = [
  "The order in which player details are entered does not determine the order of the game.",
  "The player with the highest die throw starts the game and the game continues in an order determined by the system.",
]

function InitializationInfo({
  startInitialization,
}: {
  startInitialization: () => void
}) {
  return (
    <>
      <h1 className="text-3xl text-center mb-5">
        Let&apos;s get this game started!
      </h1>
      <p className="text-center text-xl font-bold mb-3">
        The game is about to be initialized.
        <br /> Here are a few points to note
      </p>
      <ul className="list-disc flex flex-col items-start text-[1rem] font-medium mx-auto max-w-[88%]">
        {pointsToNote.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <small className="flex items-center gap-x-2 justify-center">
        Best of luck!!!
        <span className="flex items-center gap-x-2">
          You&apos;ll need plenty <span className="text-xl">😜</span>
        </span>
      </small>
      <button
        type="button"
        name="start game initialization"
        onClick={startInitialization}
        className="block mt-3 rounded-lg font-bold text-[1rem] shadow-2xl hover:scale-[1.03] active:scale-[0.98] bg-primary-dark text-primary-default w-full max-w-[200px] mx-auto py-[0.83rem] px-[1rem] "
      >
        Start Initialization
      </button>
    </>
  )
}
