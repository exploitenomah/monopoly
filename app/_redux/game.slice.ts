"use client"

import { createSlice, createAction } from "@reduxjs/toolkit"
import { GameDetails } from "../types"
import { PlayerDetail } from "../types"
import BoardGame from "@/app/_classes/BoardGame"
import { decrypt } from "@/app/_utils/auth"
import { checkIsMatchingAction, copyBoardGame } from "./utils"

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
  },
})

export const { setGame, authorize, initGame, advanceCurrentPlayer } =
  gameSlice.actions
export default gameSlice.reducer
