
'use client'
import { ReactNode } from 'react'
import { Provider } from "react-redux"
import store from "@/app/_redux/store"

export default function ReduxProvider({ children}: { children: ReactNode | ReactNode[]}) {
  return <Provider store={store}>{children}</Provider>
}
