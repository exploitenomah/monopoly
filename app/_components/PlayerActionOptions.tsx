import { useMemo } from "react"
import BoardGame, {
  chanceTiles,
  communityChestTiles,
} from "../_classes/BoardGame"
import HousingProperty from "../_classes/HousingProperty"
import Player from "../_classes/Player"
import StationProperty from "../_classes/StationProperty"
import UtilityProperty from "../_classes/UtilityProperty"
import { declineToPurchase, playerAction } from "../_redux/game.slice"
import { useAppDispatch } from "../_redux/hooks"
import CenterCard from "./CenterCard"

export default function PlayerActionOptions({
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
        } else if (
          currentPositionProperty.owner !== null &&
          currentPositionProperty?.owner === currentPlayer.id
        )
          return "Because you own this property, you do not pay rent. You can either transact or pass onto the next turn"
      } else {
        return "Because you own this property, you do not pay rent. You can either transact or pass onto the next turn"
      }
    }
  }, [currentPlayer, rollValue])
  const showActionOptions = useMemo(() => {
    return (
      currentPlayer &&
      ((currentPlayer.justLandedOn === currentPlayer.currentPosition &&
        currentPlayer.hasActed === false &&
        !currentPlayerIsOnChanceOrChest) ||
        (currentPlayer.hasJustAdvanced === true &&
          game.hasHandledAdvancement === false))
    )
  }, [
    currentPlayer?.justLandedOn,
    currentPlayer?.hasActed,
    currentPlayer?.currentPosition,
    currentPlayerIsOnChanceOrChest,
    currentPlayer?.hasJustAdvanced,
    game.hasHandledAdvancement,
  ])

  const playerCanActOnProperty = useMemo(() => {
    return (
      currentPlayer &&
      currentPositionProperty &&
      ((!("owner" in currentPositionProperty) &&
        !("price" in currentPositionProperty)) ||
        currentPositionProperty?.owner === currentPlayer.id ||
        (currentPlayer.accountBalance >= currentPositionProperty?.price &&
          currentPositionProperty?.owner === null) ||
        (currentPlayer.id !== currentPositionProperty.owner &&
          currentPositionProperty.owner !== null))
    )
  }, [currentPlayer, currentPositionProperty])

  if (!showActionOptions || !currentPositionProperty) return null
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <CenterCard>
        <div className="min-h-[20vh] min-w-[280px]">
          <div>{displayText}</div>
          {currentPlayer &&
            currentPlayer.accountBalance < currentPositionProperty?.price &&
            currentPositionProperty?.owner === null && (
              <b className="text-red-500 block my-1 ">
                You cannot afford this property!!
              </b>
            )}
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

            {playerCanActOnProperty && (
              <button
                className="capitalize shadow-lg p-4 rounded-lg border text-primary-default bg-primary-dark"
                onClick={() =>
                  currentPlayer && appDispatch(playerAction(currentPlayer.id))
                }
              >
                {currentPositionProperty?.owner === currentPlayer?.id
                  ? "done"
                  : "ok"}
              </button>
            )}
          </div>
        </div>
      </CenterCard>
    </div>
  )
}
