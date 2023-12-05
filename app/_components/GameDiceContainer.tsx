import Dice from "./Dice"
import useDice from "@/app/_hooks/useDice"
import {
  useState,
  useEffect,
  useCallback
} from "react"
import BoardGame from "@/app/_classes/BoardGame"
import Player from "@/app/_classes/Player"
import BiddingDisplay from "./BiddingDisplay"
import InJailOptions from "./InJailOptions"
import PlayerActionOptions from "./PlayerActionOptions"

export default function GameDiceContainer({
  currentPlayer,
  advanceCurrentPlayer,
  game,
  diceDisabled,
}: {
  advanceCurrentPlayer: (rollValue: number, isDouble: boolean) => void
  currentPlayer?: Player
  game: BoardGame
  diceDisabled: boolean
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
        <Dice
          disabled={diceDisabled}
          rollValue={diceOne.rollValue}
          isRolling={diceOne.isRolling}
        />
        <Dice
          disabled={diceDisabled}
          rollValue={diceTwo.rollValue}
          isRolling={diceTwo.isRolling}
        />
      </div>
      <PlayerActionOptions
        game={game}
        currentPlayer={currentPlayer}
        rollValue={diceOne.rollValue + diceTwo.rollValue}
      />
    </>
  )
}
