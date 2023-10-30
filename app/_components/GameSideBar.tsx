import { useRef } from "react"
import useOutsideClick from "../_hooks/useOutsideClick"
export default function GameSideBar({
  show,
  close,
}: {
  show: boolean
  close: () => void
}) {
  const sideBarRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(sideBarRef, () => close())
  return (
    <div
      ref={sideBarRef}
      className={`${
        show ? "translate-x-0" : "translate-x-[100%]"
      } right-0 fixed h-screen w-[90vw] max-w-[450px] bg-primary-default z-30 duration-300 transition-transform`}
    ></div>
  )
}
