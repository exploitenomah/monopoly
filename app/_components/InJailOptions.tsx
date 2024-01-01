import Player from "../_classes/Player"
import { getOutOfJail } from "../_redux/game.slice"
import { useAppDispatch } from "../_redux/hooks"
import CenterCard from "./CenterCard"



export default 
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
        {currentPlayer && currentPlayer.accountBalance >= 50 ? (
          <button
            onClick={() => {
              appDispatch(getOutOfJail("PAY-50"))
              hidePrisonerOptions()
            }}
            className="text-[1rem] underline font-semibold text-center"
          >
            Pay 50
          </button>
        ) : (
          <div className="w-full">You cannot afford to pay 50</div>
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
          <button
            onClick={() => {
              appDispatch(getOutOfJail("USE-GAMECARD"))
              hidePrisonerOptions()
            }}
            className="w-full capitalize bg-primary-dark px-3 py-4 mx-auto max-w-[250px] rounded-lg text-primary-default"
          >
            use get out of jail card
          </button>
        )}
      </div>
    </CenterCard>
  )
}
