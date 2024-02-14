import { useCallback, useEffect, useMemo, useState } from "react"
import BoardGame, {
  chanceTiles,
  communityChestTiles,
} from "../_classes/BoardGame"
import Player from "../_classes/Player"
import {
  declineToPurchase,
  mortgageProperties,
  playerAction,
  redeemProperty,
} from "../_redux/game.slice"
import { useAppDispatch } from "../_redux/hooks"
import CenterCard from "./CenterCard"
import { createPortal } from "react-dom"
import { TitleDeeds } from "./TitleDeeds/TitleDeedsContainer"
import GameSideBar from "./GameSideBar"
import toast from "react-hot-toast"
import useGeneratePlayerActionText from "../_hooks/useGeneratePlayerActionText"
import HousingProperty from "../_classes/HousingProperty"
import StationProperty from "../_classes/StationProperty"
import UtilityProperty from "../_classes/UtilityProperty"

export default function PlayerActionOptions({
  currentPlayer,
  game,
  rollValue,
}: {
  currentPlayer?: Player
  game: BoardGame
  rollValue: number
}) {
  const [isMortgaging, setIsMortgaging] = useState<number | null>(null)
  const appDispatch = useAppDispatch()
  const currentPlayerIsOnChanceOrChest = useMemo(() => {
    return (
      chanceTiles.includes(currentPlayer?.currentPosition as number) ||
      communityChestTiles.includes(currentPlayer?.currentPosition as number)
    )
  }, [currentPlayer?.currentPosition])

  const currentPositionProperty = useMemo(
    () =>
      BoardGame.findPropertyByPosition(
        game,
        currentPlayer?.currentPosition as number
      ),
    [game, currentPlayer?.currentPosition]
  )
  const { infoText, toastText } = useGeneratePlayerActionText({
    currentPlayer,
    game,
    rollValue,
    currentPositionProperty,
  })
  const toastMessage = toastText as { decline: string; accept: string }
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

  const handleDeclineToPurchase = useCallback(() => {
    toastMessage.decline.length > 0 && toast(toastMessage.decline)
    currentPlayer && appDispatch(declineToPurchase(currentPlayer.id))
  }, [toastMessage.decline, currentPlayer, appDispatch])

  const handlePlayerAction = useCallback(() => {
    toastMessage.accept.length > 0 && toast(toastMessage.accept)
    currentPlayer && appDispatch(playerAction(currentPlayer.id))
  }, [currentPlayer, toastMessage.accept, appDispatch])

  if (!showActionOptions || !currentPositionProperty) return null
  return (
    <>
      <MortgageView
        show={isMortgaging !== null}
        close={() => setIsMortgaging(null)}
        game={game}
        player={currentPlayer}
      />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <CenterCard>
          <div className="min-h-[20vh] min-w-[280px]">
            <div>{infoText as string}</div>
            {currentPlayer &&
              currentPlayer.accountBalance < currentPositionProperty?.price &&
              currentPositionProperty?.owner === null && (
                <b className="text-red-500  min-w-[40%] block my-1 ">
                  You cannot afford this property!!
                </b>
              )}
            <div className="flex flex-wrap mt-4 gap-4 items-center justify-center">
              {currentPositionProperty.owner === null && (
                <>
                  <button
                    onClick={() =>
                      currentPlayer && setIsMortgaging(currentPlayer.id)
                    }
                    className=" max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border text-sm font-bold capitalize bg-primary-dark text-primary-default"
                  >
                    Mortgage properties
                  </button>
                  <button
                    onClick={handleDeclineToPurchase}
                    className=" max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border text-sm font-bold capitalize"
                  >
                    decline to purchase
                  </button>
                </>
              )}
              {currentPositionProperty.owner === currentPlayer?.id && (
                <button className="capitalize  max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border border-primary-dark text-primary-dark">
                  transact
                </button>
              )}

              {playerCanActOnProperty && (
                <button
                  className="capitalize max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border text-primary-default bg-primary-dark"
                  onClick={handlePlayerAction}
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
    </>
  )
}

function MortgageView({
  player,
  game,
  close,
  show,
}: {
  player?: Player
  game: BoardGame
  close: () => void
  show: boolean
}) {
  const dispatch = useAppDispatch()
  const [document, setDocument] = useState<Document | null>(null)
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const playerProperties = useMemo(() => {
    return player
      ? BoardGame.findPropertiesBelongingToOwner(player.id, game)
      : []
  }, [])

  const toggleSelected = useCallback(
    (property: HousingProperty | UtilityProperty | StationProperty) => {
      if (
        Boolean(
          (property as HousingProperty).hotelsCount ||
            (property as HousingProperty).hotelsCount
        ) === true
      )
        return toast(
          `You must sell the houses on ${property.name} before you can mortgage it`
        )
      setSelectedProperties((prev) => {
        if (prev.includes(property.id))
          return prev.filter((it) => it !== property.id)
        else return [...prev, property.id]
      })
    },
    []
  )

  const handleMortgage = useCallback(() => {
    console.log(selectedProperties, "here", player)
    const propertiesToMortgage = selectedProperties.filter((it) =>
      player?.properties.includes(it)
    )
    if (player)
      dispatch(
        mortgageProperties({
          properties: propertiesToMortgage,
          playerId: player?.id,
        })
      )
    console.log(propertiesToMortgage, "here")
  }, [selectedProperties, player, dispatch])

  const handleRedemption = useCallback(
    (property: HousingProperty | StationProperty | UtilityProperty) => {
      if (player && property.redemptionValue > player?.accountBalance) {
        return toast(`Cannot redeem ${property.name}! Insufficient balance`)
      } else {
        dispatch(redeemProperty(property.id))
      }
    },
    [dispatch, player, toast]
  )

  useEffect(() => {
    if (document === null) setDocument(window.document)
  }, [])

  if (!player) return null
  return (
    document &&
    createPortal(
      <GameSideBar show={show} close={close}>
        <h1 className="text-primary-dark text-2xl text-center mt-5">
          <span className="font-bold capitalize">{player.name}</span>, Select
          the properties you would like to mortgage.
        </h1>
        <ul className="list-none w-full flex gap-3 px-5 py-4 flex-wrap justify-center items-center">
          {playerProperties.map((property, idx) => (
            <SelectableTitleDeed
              isSelected={selectedProperties.includes(property.id)}
              isMortgaged={player.mortgagedProperties.includes(property.id)}
              toggleSelected={() => toggleSelected(property)}
              key={property.id}
              property={property}
              handleRedemption={() => handleRedemption(property)}
            />
          ))}
        </ul>
        {player.mortgagedProperties.length === player.properties.length ? (
          <p className="absolute top-1/2 left-1/2 bg-black/80 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-red-500 mx-auto text-[3.5rem]">You have mortgaged all your properties</p>
        ) : (
          <button
            onClick={handleMortgage}
            className="bg-red-600 font-bold capitalize mt-4 text-lg text-white py-2 px-3 mx-auto block rounded-lg"
          >
            Mortgage
          </button>
        )}
      </GameSideBar>,
      document?.body,
      player?.id.toString()
    )
  )
}

function SelectableTitleDeed({
  property,
  isSelected,
  toggleSelected,
  isMortgaged,
  handleRedemption,
}: {
  isSelected: boolean
  property: HousingProperty | StationProperty | UtilityProperty
  toggleSelected: () => void
  isMortgaged: boolean
  handleRedemption: () => void
}) {
  const Component = TitleDeeds[property.type as keyof typeof TitleDeeds]

  if (isMortgaged)
    return (
      <div className="flex flex-col items-center pb-3 border-2 border-solid border-red-600 text-center w-full max-w-[180px] min-h-[200px] shrink-0 relative self-stretch gap-0 min-w-[280px] relative">
        <div
          style={{
            backgroundColor: (property as HousingProperty).color || "black",
          }}
          className="h-[25px] w-full border-b-solid border-b-[2px] border-b-red-600"
        ></div>
        <p className="mb-auto">
          <span className="text-[1.2rem] text-primary-dark font-medium ">
            {property.name}
          </span>
          <span className="text-red-600 font-bold text-[1.4rem] absolute top-1/2 left-1/2 rotate-[-25deg] -translate-y-1/2 -translate-x-1/2">
            Mortgaged!
          </span>
        </p>
        <button
          onClick={handleRedemption}
          className="bg-green-700 hover:bg-green-600 text-white text-lg capitalize rounded-lg py-3 px-4"
        >
          redeem
        </button>
      </div>
    )
  return (
    <label
      key={property.id}
      className="w-full max-w-[180px] shrink-0 cursor-pointer flex items-start gap-0 min-w-[280px] relative"
    >
      <input
        checked={isSelected}
        onChange={() => toggleSelected()}
        type="checkbox"
        className="appearance-none"
      />
      <span
        className={`block absolute top-[10px] left-[30px] rounded-md w-[30px] h-[25px] border-2 border-primary-dark shadow-xl ${
          isSelected ? "bg-blue-500" : "bg-primary-default"
        }`}
      ></span>
      <Component property={property as any} />
    </label>
  )
}
