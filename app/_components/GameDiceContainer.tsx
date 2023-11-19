import Dice from "./Dice"
import useDice from "@/app/_hooks/useDice"
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  FormEventHandler,
} from "react"
import BoardGame, {
  chanceTiles,
  communityChestTiles,
} from "@/app/_classes/BoardGame"
import Player from "@/app/_classes/Player"
import HousingProperty from "@/app/_classes/HousingProperty"
import StationProperty from "@/app/_classes/StationProperty"
import UtilityProperty from "@/app/_classes/UtilityProperty"
import {
  getOutOfJail,
  playerAction,
  declineToPurchase,
  cancelBidding,
  sellToHighestBidder,
} from "@/app/_redux/game.slice"
import { useAppDispatch } from "@/app/_redux/hooks"

export default function GameDiceContainer({
  currentPlayer,
  advanceCurrentPlayer,
  game,
}: {
  advanceCurrentPlayer: (rollValue: number, isDouble: boolean) => void
  currentPlayer?: Player
  game: BoardGame
}) {
  const [hasRolled, setHasRolled] = useState(false)
  const diceOne = useDice(500)
  const diceTwo = useDice(500)
  const [showPrisonerOptions, setShowPrisonerOptions] = useState(false)

  const roll = useCallback(() => {
    if (currentPlayer?.isInJail && !currentPlayer.isRollingForDoubles)
      return setShowPrisonerOptions(true)
    diceOne.roll()
    diceTwo.roll()
    setHasRolled(true)
  }, [
    diceOne,
    diceTwo,
    currentPlayer?.isInJail,
    currentPlayer?.isRollingForDoubles,
  ])

  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      const rollValue = diceOne.rollValue + diceTwo.rollValue
      if (!isNaN(rollValue) && hasRolled === true) {
        advanceCurrentPlayer(rollValue, diceOne.rollValue === diceTwo.rollValue)
        setHasRolled(false)
      }
    }, 600)
    return () => {
      clearTimeout(resetTimeout)
    }
  }, [diceOne.rollValue, diceTwo.rollValue, advanceCurrentPlayer, hasRolled])

  useEffect(() => {
    if (currentPlayer) {
      if (currentPlayer.isInJail && !currentPlayer.isRollingForDoubles)
        setShowPrisonerOptions(true)
    }
  }, [currentPlayer?.isInJail])

  if (typeof game.positionUpForBidding === "number")
    return <BiddingDisplay game={game} />

  if (showPrisonerOptions)
    return (
      <InJailOptions
        currentPlayer={currentPlayer}
        hidePrisonerOptions={() => setShowPrisonerOptions(false)}
      />
    )
  return (
    <>
      <div
        onClick={roll}
        className="dice-container grid grid-flow-col gap-x-[35px] items-center justify-center"
      >
        <Dice rollValue={diceOne.rollValue} isRolling={diceOne.isRolling} />
        <Dice rollValue={diceTwo.rollValue} isRolling={diceTwo.isRolling} />
      </div>
      <PlayerActionOptions
        game={game}
        currentPlayer={currentPlayer}
        rollValue={diceOne.rollValue + diceTwo.rollValue}
      />
    </>
  )
}

function InJailOptions({
  currentPlayer,
  hidePrisonerOptions,
}: {
  currentPlayer?: Player
  hidePrisonerOptions: () => void
}) {
  const appDispatch = useAppDispatch()

  return (
    <CenterCard>
      <h3>
        <span className="capitalize font-bold">{currentPlayer?.name}</span>, You
        are currently in jail 😞 😔
      </h3>
      <p>How would you like to get out?</p>
      <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
        {currentPlayer && currentPlayer.accountBalance >= 500 ? (
          <button
            onClick={() => {
              appDispatch(getOutOfJail("PAY-500"))
              hidePrisonerOptions()
            }}
            className="text-[1rem] underline font-semibold text-center"
          >
            Pay 500
          </button>
        ) : (
          <div className="w-full">You cannot afford to pay 500</div>
        )}

        <button
          onClick={() => {
            appDispatch(getOutOfJail("ROLL-FOR-DOUBLE"))
            hidePrisonerOptions()
          }}
          className="text-[1rem] underline font-semibold text-center"
        >
          Roll For Double
        </button>
        {(currentPlayer?.getOutOfJailCards.chance !== null ||
          currentPlayer?.getOutOfJailCards.communityChest !== null) && (
          <button className="w-full capitalize bg-primary-dark px-3 py-4 mx-auto max-w-[250px] rounded-lg text-primary-default">
            use get out of jail card
          </button>
        )}
      </div>
    </CenterCard>
  )
}

function PlayerActionOptions({
  currentPlayer,
  game,
  rollValue,
}: {
  currentPlayer?: Player
  game: BoardGame
  rollValue: number
}) {
  const appDispatch = useAppDispatch()
  const currentPlayerIsOnChanceOrChest = useMemo(() => {
    return (
      chanceTiles.includes(currentPlayer?.currentPosition as number) ||
      communityChestTiles.includes(currentPlayer?.currentPosition as number)
    )
  }, [currentPlayer?.currentPosition])

  const currentPositionProperty = useMemo(
    () =>
      BoardGame.findProperty(game, currentPlayer?.currentPosition as number),
    [game, currentPlayer?.currentPosition]
  )
  const displayText = useMemo(() => {
    if (!currentPlayer) return ""
    if (chanceTiles.includes(currentPlayer.currentPosition)) {
      return ""
    } else if (communityChestTiles.includes(currentPlayer.currentPosition)) {
      return ""
    } else if (currentPlayer.currentPosition === 38)
      return `${currentPlayer.name}, You have recieved the super tax of 100`
    else if (currentPlayer.currentPosition === 4)
      return `${currentPlayer.name}, You have recieved the income tax of 200`
    else {
      if (
        currentPositionProperty &&
        !chanceTiles.includes(currentPositionProperty.position as number) &&
        !communityChestTiles.includes(
          currentPositionProperty.position as number
        )
      ) {
        let lines = {
          1: "LineOne",
          2: "LineTwo",
          3: "LineThree",
          4: "LineFour",
        }
        const currentLineOfProperties = Math.ceil(
          (currentPositionProperty.position as number) / 10
        ) as keyof typeof lines
        if (
          currentPositionProperty.owner !== null &&
          currentPositionProperty.owner !== currentPlayer.id
        ) {
          return `${
            currentPlayer.name
          }, you will now pay a rent amount of ${BoardGame.calculatePropertyRent(
            currentPositionProperty,
            game.properties[
              currentLineOfProperties as keyof typeof game.properties
            ] as (HousingProperty | UtilityProperty | StationProperty)[],
            rollValue
          )} to ${
            game.players.find((it) => it.id === currentPositionProperty.owner)
              ?.name
          }`
        } else if (currentPositionProperty.owner === null) {
          return `${currentPlayer.name}, you have landed on ${currentPositionProperty.name}. It is unbought. Would you like to purchase it?`
        }
      } else {
        return ""
      }
    }
  }, [currentPlayer, rollValue])
  const showActionOptions = useMemo(() => {
    return (
      currentPlayer?.justLandedOn === currentPlayer?.currentPosition &&
      currentPlayer?.hasActed === false &&
      !currentPlayerIsOnChanceOrChest
    )
  }, [
    currentPlayer?.justLandedOn,
    currentPlayer?.hasActed,
    currentPlayer?.currentPosition,
    currentPlayerIsOnChanceOrChest,
  ])

  if (!showActionOptions) return null
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <CenterCard>
        <div className="min-h-[20vh] min-w-[280px]">
          <div>{displayText}</div>
          <div className="flex mt-4 gap-x-4 items-center justify-center">
            {currentPositionProperty.owner === null && (
              <button
                onClick={() =>
                  currentPlayer &&
                  appDispatch(declineToPurchase(currentPlayer.id))
                }
                className="capitalize shadow-lg p-4 rounded-lg border"
              >
                no
              </button>
            )}
            {currentPositionProperty.owner === currentPlayer?.id && (
              <button className="capitalize shadow-lg p-4 rounded-lg border border-primary-dark text-primary-dark">
                transact
              </button>
            )}
            <button
              className="capitalize shadow-lg p-4 rounded-lg border text-primary-default bg-primary-dark"
              onClick={() =>
                currentPlayer && appDispatch(playerAction(currentPlayer.id))
              }
            >
              {currentPositionProperty.owner === currentPlayer?.id
                ? "done"
                : "ok"}
            </button>
          </div>
        </div>
      </CenterCard>
    </div>
  )
}

function BiddingDisplay({ game }: { game: BoardGame }) {
  const dispatch = useAppDispatch()
  const [error, setError] = useState("")
  const [highestBid, setHighestBid] = useState(0)
  const [highestBidder, setHighestBidder] = useState<null | Player>(null)
  const [currentBidderIdx, setCurrentBidderIdx] = useState<number>(0)
  const currentBidder = useMemo(
    () => game.players[currentBidderIdx],
    [currentBidderIdx]
  )
  const propertyToBidFor = useMemo(
    () =>
      typeof game.positionUpForBidding === "number" &&
      BoardGame.findProperty(game, game.positionUpForBidding),
    [currentBidderIdx]
  )
  const [hasBid, setHasBid] = useState<number[]>([])
  const [hasPassed, setHasPassed] = useState<number[]>([])
  const [bidValue, setBidValue] = useState("")

  const handleBid: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      if (+bidValue <= highestBid && bidValue.length > 0) {
        return setError(
          `Your bid must be higher than the current highest bid of ${highestBid}`
        )
      } else if (bidValue.length > 0) {
        if (+bidValue > currentBidder.accountBalance)
          return setError("You cannot bid higher than your account balance")
        setHighestBidder(currentBidder)
        setHighestBid(+bidValue)
      } else {
        setHasPassed((prev) =>
          prev.length < game.players.length
            ? [...prev, currentBidder.id]
            : [currentBidder.id]
        )
      }
      setCurrentBidderIdx((prev) => {
        return prev + 1 < game.players.length ? prev + 1 : 0
      })
      setHasBid((prev) => {
        return prev.length < game.players.length
          ? [...prev, currentBidder.id]
          : [currentBidder.id]
      })
      setError("")
      setBidValue("")
    },
    [currentBidder, highestBid, bidValue]
  )

  useEffect(() => {
    if (hasPassed.length >= game.players.length - 1 && highestBidder) {
      dispatch(
        sellToHighestBidder({
          bidValue: highestBid,
          playerId: highestBidder.id,
        })
      )
    } else if (hasPassed.length === game.players.length && !highestBidder) {
      dispatch(cancelBidding())
    }
  }, [highestBid, hasBid, highestBidder, hasPassed])

  return (
    <>
      <CenterCard>
        {highestBidder && (
          <h2>
            The current highest bidder is {highestBidder.name} with a bid
            of&nbsp;
            {highestBid}
          </h2>
        )}
        <p className="mb-3">
          {currentBidder.isInJail
            ? "You cannot bid in jail"
            : `Player ${currentBidder.name}, enter an amount to bid for 
          ${propertyToBidFor && propertyToBidFor.name}`}
        </p>
        <p className="text-red-600 mb-2">{error}</p>
        <form
          onSubmit={handleBid}
          className="flex itemx-center flex-col gap-y-3"
        >
          {!currentBidder.isInJail && (
            <input
              type="number"
              value={bidValue}
              onChange={(e) => setBidValue(e.target.value)}
              className="w-full bg-transparent p-3 border border-primary-dark focus:outline-primary-dark"
            />
          )}
          <div className="capitalize flex gap-x-3 mx-auto mt-5">
            {(bidValue.toString().length === 0 || currentBidder.isInJail) && (
              <button
                type="submit"
                className="px-5 py-3 border border-primary-dark  shadow-lg w-fit rounded-lg"
              >
                pass
              </button>
            )}
            {!currentBidder.isInJail && (
              <button
                type="submit"
                className="px-5 py-3 border bg-primary-dark text-white  shadow-lg w-fit rounded-lg"
              >
                bid
              </button>
            )}
          </div>
        </form>
      </CenterCard>
    </>
  )
}

function CenterCard({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <>
      <div style={{ perspectiveOrigin: "bottom", perspective: "100px" }}>
        <div
          style={{ transform: "rotateX(-5deg) translateZ(20px)" }}
          className="rounded-lg bg-primary-default text-primary-dark border-primary-dark border-[3px] px-3 py-12 text-center"
        >
          {children}
        </div>
      </div>
    </>
  )
}
