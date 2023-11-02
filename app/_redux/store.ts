import { configureStore } from "@reduxjs/toolkit"

import Game from "./game.slice"
const store = configureStore({
  reducer: {
    Game,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
