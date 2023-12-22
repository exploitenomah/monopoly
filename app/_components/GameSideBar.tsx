import { useRef, ReactNode } from "react"
import useOutsideClick from "../_hooks/useOutsideClick"

export default function GameSideBar({
  show,
  close,
  children
}: {
  show: boolean
  close: () => void
  children: ReactNode | ReactNode[]
}) {
  const sideBarRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(sideBarRef, () => close())
  return (
    <div
      ref={sideBarRef}
      className={`${
        show
          ? "translate-x-0 shadow-[-19px_20px_20px_20px_#00000024]"
          : "translate-x-[100%]"
      } right-0 top-0 fixed h-screen overflow-auto w-[90vw] max-w-[85%] bg-primary-default z-30 duration-300 transition-transform`}
    >
      {children}
    </div>
  )
}
