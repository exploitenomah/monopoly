import BoardGame from "@/app/_classes/BoardGame"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

export function checkIsMatchingAction(
  actionRequired: ActionCreatorWithPayload<any, string>,
  callback: (state: any, action: { payload: any; type: string }) => void
) {
  return (state: any, actionGiven: { payload: any; type: string }) => {
    if (actionRequired.match(actionGiven)) {
      callback(state, actionGiven)
    }
  }
}

export function copyBoardGame(game: BoardGame) {
  return BoardGame.revive(JSON.parse(JSON.stringify(game)))
}
