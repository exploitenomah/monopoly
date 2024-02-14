"use client"

import { createSlice } from "@reduxjs/toolkit"
import BoardGame from "@/app/_classes/BoardGame"
import { decrypt } from "@/app/_utils/auth"
import { copyBoardGame } from "./utils"
import { GetOutOfJailChoice } from "@/app/types"
import Player from "../_classes/Player"

const initialState: {
  game: BoardGame | null
  isAuthorized: boolean
} = {
  game: null,
  isAuthorized: false,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.game = action.payload
    },
    authorize: (state, action) => {
      state.isAuthorized =
        state.game !== null &&
        decrypt(
          state.game?.password as string,
          process.env.NEXT_PUBLIC_JS_CRYPTO_KEY as string
        ) === action.payload
    },
    pauseCurrentGame: (state) => {
      state.isAuthorized = false
      state.game = null
    },
    initGame: (state, action) => {
      if (state.game !== null) {
        state.game = copyBoardGame(state.game as BoardGame).initialize(
          action.payload
        )
      }
    },
    advanceCurrentPlayer: (state, { payload: { rollValue, isDouble } }) => {
      if (state.game !== null) {
        state.game = copyBoardGame(state.game as BoardGame).advancePlayer(
          rollValue,
          isDouble
        )
      }
    },
    getOutOfJail: (
      state,
      {
        payload,
      }: {
        payload: GetOutOfJailChoice
      }
    ) => {
      state.game = copyBoardGame(
        state.game as BoardGame
      ).getCurrentPlayerOutOfJail(payload)
    },
    sendPrisonersToJail: (state, action: { payload: undefined }) => {
      state.game = copyBoardGame(state.game as BoardGame).sendPrisonersToJail()
    },
    playerAction: (state, action: { payload: number }) => {
      state.game = copyBoardGame(state.game as BoardGame).handlePlayerAction(
        action.payload
      )
    },
    declineToPurchase: (state, action: { payload: number }) => {
      state.game = copyBoardGame(state.game as BoardGame).declineToPurchase(
        action.payload
      )
    },
    cancelBidding: (state) => {
      state.game = copyBoardGame(state.game as BoardGame).cancelBidding()
    },
    sellToHighestBidder: (state, { payload: {
      bidValue, playerId
    } }: {
      payload: {
        bidValue: number,
        playerId: number
      }
    }) => {
      state.game = copyBoardGame(state.game as BoardGame).sellToHighestBidder(playerId, bidValue)
    },
    eliminateBankruptPlayers: (state, { payload }: { payload: number[]}) => {
      state.game = copyBoardGame(state.game as BoardGame).updateBankruptPlayers(payload)
    },
    mortgageProperties: (state, { payload }: { payload: { playerId: number, properties: string[]}}) => {
      state.game = copyBoardGame(state.game as BoardGame).mortgageProperties(payload.properties, payload.playerId)
    },
    redeemProperty: (state, { payload }: { payload: string }) => {
      state.game = copyBoardGame(state.game as BoardGame).redeemProperty(payload)
    }, 
    toggleSound: (state) => {
      state.game = copyBoardGame(state.game as BoardGame).toggleSound()
    }
  },
})

export const {
  setGame,
  authorize,
  pauseCurrentGame,
  initGame,
  advanceCurrentPlayer,
  getOutOfJail,
  sendPrisonersToJail,
  playerAction,
  declineToPurchase,
  cancelBidding,
  sellToHighestBidder,
  eliminateBankruptPlayers,
  toggleSound,
  mortgageProperties,
  redeemProperty,
} = gameSlice.actions
export default gameSlice.reducer
