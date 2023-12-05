import { useState, useMemo, FormEventHandler, useCallback, useEffect } from "react"
import BoardGame from "../_classes/BoardGame"
import Player from "../_classes/Player"
import { sellToHighestBidder, cancelBidding } from "../_redux/game.slice"
import { useAppDispatch } from "../_redux/hooks"
import CenterCard from "./CenterCard"



export default 
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