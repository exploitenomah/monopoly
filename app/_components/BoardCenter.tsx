import CommunityChestContainer from "./GameCards/CommunityChestContainer"
import ChanceContainer from "./GameCards/ChanceContainer"
import Image from "next/image"
import Dice from "./Dice"
import useDice from "@/app/_hooks/useDice"
import { useState, useEffect, useCallback, useMemo } from "react"
import BoardGame from "@/app/_classes/BoardGame"
import Player from "@/app/_classes/Player"
import { getOutOfJail } from "@/app/_redux/game.slice"
import { useAppDispatch } from "@/app/_redux/hooks"

export default function BoardCenter({
  game,
  advanceCurrentPlayer,
}: {
  advanceCurrentPlayer: (advancement: number, isDouble: boolean) => void
  game: BoardGame
}) {
  const currentPlayer = useMemo(() => {
    return game.players.find((it) => it.turn === game.currentTurn)
  }, [game.players, game.currentTurn])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] z-[300]">
      <CommunityChestContainer cards={game?.communityChestCards || []} />
      <Image
        src="/image-files/monopoly-logo.svg"
        alt="monopoly"
        width={300}
        height={100}
        className="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] w-[80%] h-auto"
      />
      <div className="absolute z-20 w-full h-full flex items-center justify-center">
        <GameDice
          advanceCurrentPlayer={advanceCurrentPlayer}
          currentPlayer={currentPlayer}
        />
      </div>
      <ChanceContainer cards={game?.chanceCards || []} />
    </div>
  )
}

function GameDice({
  currentPlayer,
  advanceCurrentPlayer,
}: {
  advanceCurrentPlayer: (rollValue: number, isDouble: boolean) => void
  currentPlayer?: Player
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
        advanceCurrentPlayer(
          rollValue,
          diceOne.rollValue === diceTwo.rollValue
        )
        setHasRolled(false)
      }
    }, 600)
    return () => {
      clearTimeout(resetTimeout)
    }
  }, [
    diceOne.rollValue,
    diceTwo.rollValue,
    advanceCurrentPlayer,
    hasRolled,
  ])

  useEffect(() => {
    if (currentPlayer) {
      if (currentPlayer.isInJail && !currentPlayer.isRollingForDoubles)
        setShowPrisonerOptions(true)
      // else setShowPrisonerOptions(false)
    }
    console.log(currentPlayer?.isInJail)
  }, [currentPlayer?.isInJail])

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
  console.log(currentPlayer)
  const appDispatch = useAppDispatch()

  return (
    <div style={{ perspectiveOrigin: "bottom", perspective: "100px" }}>
      <div
        style={{ transform: "rotateX(-5deg) translateZ(20px)" }}
        className="rounded-lg bg-primary-default text-primary-dark border-primary-dark border-[3px] px-3 py-12 text-center"
      >
        <h3>
          <span className="capitalize font-bold">{currentPlayer?.name}</span>,
          You are currently in jail 😞 😔
        </h3>
        <p>How would you like to get out?</p>
        <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
          {currentPlayer && currentPlayer.accountBalance >= 500 ? (
            <button
              onClick={() => appDispatch(getOutOfJail("PAY-500"))}
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
      </div>
    </div>
  )
}
