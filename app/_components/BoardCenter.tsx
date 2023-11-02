import CommunityChestContainer from "./GameCards/CommunityChestContainer"
import ChanceContainer from "./GameCards/ChanceContainer"
import Image from "next/image"
import Dice from "./Dice"
import useDice from "@/app/_hooks/useDice"
import { useState, useEffect, useCallback } from "react"
import BoardGame from "@/app/_classes/BoardGame"

export default function BoardCenter({
  game,
  advanceCurrentPlayer,
}: {
  advanceCurrentPlayer: (advancement: number, isDouble: boolean) => void
  game: BoardGame
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] ">
      <CommunityChestContainer cards={game?.communityChestCards || []} />
      <Image
        src="/image-files/monopoly-logo.svg"
        alt="monopoly"
        width={300}
        height={100}
        className="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] w-[80%] h-auto"
      />
      <div className="absolute z-20 w-full h-full flex items-center justify-center">
        <GameDice advanceCurrentPlayer={advanceCurrentPlayer} />
      </div>
      <ChanceContainer cards={game?.chanceCards || []} />
    </div>
  )
}

function GameDice({
  advanceCurrentPlayer,
}: {
  advanceCurrentPlayer: (rollValue: number, isDouble: boolean) => void
}) {
  const [hasRolled, setHasRolled] = useState(false)
  const diceOne = useDice(500)
  const diceTwo = useDice(500)

  const roll = useCallback(() => {
    diceOne.roll()
    diceTwo.roll()
    setHasRolled(true)
  }, [diceOne, diceTwo])

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

  return (
    <>
      <div
        onClick={roll}
        className="dice-container grid grid-auto-cols gap-[25px] items-center justify-center"
      >
        <Dice rollValue={diceOne.rollValue} isRolling={diceOne.isRolling} />
        <Dice rollValue={diceTwo.rollValue} isRolling={diceTwo.isRolling} />
      </div>
    </>
  )
}
